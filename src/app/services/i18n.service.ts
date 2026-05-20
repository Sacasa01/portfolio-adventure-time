import { Injectable, signal, effect } from '@angular/core';
import { localeEn } from '../i18n/en';
import { localeEs } from '../i18n/es';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private langSignal = signal<'en' | 'es'>('en');
  
  public currentLang = this.langSignal.asReadonly();
  
  private translations: Record<'en' | 'es', any> = {
    en: localeEn,
    es: localeEs
  };

  constructor() {
    this.initializeLang();

    // Effect to sync language preference with localStorage
    effect(() => {
      localStorage.setItem('lang', this.langSignal());
    });
  }

  private initializeLang() {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('lang') as 'en' | 'es' | null;
      if (savedLang === 'en' || savedLang === 'es') {
        this.langSignal.set(savedLang);
      } else {
        // Fallback to browser language if it is Spanish, otherwise English
        const browserLang = navigator.language.split('-')[0];
        this.langSignal.set(browserLang === 'es' ? 'es' : 'en');
      }
    }
  }

  public setLanguage(lang: 'en' | 'es') {
    this.langSignal.set(lang);
  }

  public toggleLanguage() {
    this.langSignal.update(lang => lang === 'en' ? 'es' : 'en');
  }

  /**
   * Resolves a nested key string (e.g. 'HERO.TAGLINE') against the current locale dictionary.
   */
  public translate(key: string): string {
    const lang = this.langSignal();
    const dictionary = this.translations[lang];
    
    if (!key) return '';

    const parts = key.split('.');
    let result = dictionary;

    for (const part of parts) {
      if (result && result[part] !== undefined) {
        result = result[part];
      } else {
        // Return key name if translation is not found (helpful for debugging)
        return key;
      }
    }

    return typeof result === 'string' ? result : key;
  }
}
