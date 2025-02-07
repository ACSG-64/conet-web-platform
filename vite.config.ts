import { paraglide } from '@inlang/paraglide-sveltekit/vite';
import { sentrySvelteKit } from '@sentry/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';
import dotenv from 'dotenv';
import { defineConfig } from 'vitest/config';

dotenv.config();

export default defineConfig({
    plugins: [
        sentrySvelteKit({
            sourceMapsUploadOptions: {
                org: process.env.SENTRY_ORG as string,
                project: process.env.SENTRY_PROJECT as string
            }
        }),
        sveltekit(),
        paraglide({
            project: './project.inlang',
            outdir: './src/lib/paraglide'
        })
    ],

    test: {
        include: ['src/**/*.{test,spec}.{js,ts}']
    }
});
