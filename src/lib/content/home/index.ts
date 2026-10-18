import { home as en } from './en.ts';
import { home as fr } from './fr.ts';
import { home as es } from './es.ts';
import { home as nl } from './nl.ts';
import type { Locale } from '#lib/i18n.ts';

export type { HomeContent } from './en.ts';

// Contenu par défaut de l'accueil, par langue
export const HOME: Record<Locale, typeof en> = { en, fr, es, nl };
