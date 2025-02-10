import { env } from '$env/dynamic/private';
import { DiscordOAuthProvider } from '../../infrastructure/providers';

export const discordOAuthProviderToken = Symbol();
export const discordOAuthProvider = new DiscordOAuthProvider(
    env.DISCORD_CLIENT_ID,
    env.DISCORD_SECRET,
    env.DISCORD_REDIRECT_URI
);
