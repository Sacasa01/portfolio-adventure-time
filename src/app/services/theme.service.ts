import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSignal = signal<'light' | 'dark'>('light');

  public currentTheme = this.themeSignal.asReadonly();

  constructor() {
    // Load initial theme on service creation
    this.initializeTheme();

    // Effect to automatically sync body classes and localStorage whenever themeSignal changes
    effect(() => {
      const theme = this.themeSignal();
      const body = document.body;
      
      if (theme === 'dark') {
        body.classList.add('dark-theme');
      } else {
        body.classList.remove('dark-theme');
      }

      localStorage.setItem('theme', theme);
    });
  }

  private initializeTheme() {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        this.themeSignal.set(savedTheme);
      } else {
        // System preference default
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.themeSignal.set(systemPrefersDark ? 'dark' : 'light');
      }
    }
  }

  public toggleTheme() {
    this.themeSignal.update(theme => theme === 'light' ? 'dark' : 'light');
  }
}
