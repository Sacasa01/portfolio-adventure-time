import en from '../i18n/en.json';
import es from '../i18n/es.json';

export const DICTS = { en, es } as const;

/** Server-side lookup (English is the SSR/SEO default). */
export function t(path: string): string {
  const value = path
    .split('.')
    .reduce<unknown>((obj, key) => (obj as Record<string, unknown> | undefined)?.[key], en as unknown);
  return typeof value === 'string' ? value : path;
}
