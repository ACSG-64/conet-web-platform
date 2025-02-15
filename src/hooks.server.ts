import 'reflect-metadata';
import { env } from '$env/dynamic/public';
import { i18n } from '$lib/i18n';
import * as Sentry from '@sentry/sveltekit';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

Sentry.init({
    dsn: env.PUBLIC_SENTRY_DSN,
    tracesSampleRate: 1,

    beforeSend(event) {
        // Send data only in production
        if (env.PUBLIC_ENV !== 'production') return null;
        return event;
    }
});

const handleParaglide: Handle = i18n.handle();

export const handle: Handle = sequence(Sentry.sentryHandle(), handleParaglide);
export const handleError = Sentry.handleErrorWithSentry();
