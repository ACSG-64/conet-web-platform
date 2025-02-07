import 'reflect-metadata';
import { env } from '$env/dynamic/private';
import { i18n } from '$lib/i18n';
import * as Sentry from '@sentry/sveltekit';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

Sentry.init({
    dsn: env.SENTRY_DSN,
    tracesSampleRate: 1
});

const handleAuth: Handle = async ({ event, resolve }) => resolve(event);
const handleParaglide: Handle = i18n.handle();

export const handle: Handle = sequence(Sentry.sentryHandle(), handleAuth, handleParaglide);
export const handleError = Sentry.handleErrorWithSentry();
