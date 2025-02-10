CREATE TABLE "languages" (
	"iso" char(2) PRIMARY KEY NOT NULL,
	"name" varchar(15) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "timezones" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "timezones_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"tz_identifier" varchar(30) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "discord_accounts" (
	"user_id" integer PRIMARY KEY NOT NULL,
	"account_id" varchar(25) NOT NULL,
	"notification_channel_id" varchar(25) NOT NULL,
	CONSTRAINT "discord_accounts_account_id_unique" UNIQUE("account_id"),
	CONSTRAINT "discord_accounts_notification_channel_id_unique" UNIQUE("notification_channel_id")
);
--> statement-breakpoint
CREATE TABLE "github_accounts" (
	"user_id" integer PRIMARY KEY NOT NULL,
	"object_id" integer NOT NULL,
	"node_id" varchar(30) NOT NULL,
	CONSTRAINT "github_accounts_node_id_unique" UNIQUE("node_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"uuid" char(21) NOT NULL,
	"name" varchar(50) NOT NULL,
	"surname" varchar(50) NOT NULL,
	"username" varchar(25) NOT NULL,
	"image_url" varchar(75),
	"primary_language_id" char(2) NOT NULL,
	"timezone_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_uuid_unique" UNIQUE("uuid"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "discord_accounts" ADD CONSTRAINT "discord_accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "github_accounts" ADD CONSTRAINT "github_accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_primary_language_id_languages_iso_fk" FOREIGN KEY ("primary_language_id") REFERENCES "public"."languages"("iso") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_timezone_id_timezones_id_fk" FOREIGN KEY ("timezone_id") REFERENCES "public"."timezones"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE UNIQUE INDEX "gh_idx" ON "github_accounts" USING btree ("object_id");--> statement-breakpoint
CREATE UNIQUE INDEX "uuid_idx" ON "users" USING btree ("uuid");