import { legal as en } from './en.ts';
import { legal as fr } from './fr.ts';
import { legal as es } from './es.ts';
import { legal as nl } from './nl.ts';
import type { Locale } from '#lib/i18n.ts';
import type { LegalPages } from './types.ts';

// Pages légales, par langue
export const LEGAL: Record<Locale, LegalPages> = { en, fr, es, nl };
