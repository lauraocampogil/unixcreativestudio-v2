import * as en from './en.ts';
import * as fr from './fr.ts';
import * as es from './es.ts';
import * as nl from './nl.ts';
import type { Locale } from '#lib/i18n.ts';

export type { ServiceInfo } from './en.ts';

// Pages « info service », par langue
export const SERVICES: Record<Locale, typeof en> = { en, fr, es, nl };
