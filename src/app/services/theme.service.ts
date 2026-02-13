import { Injectable, signal } from '@angular/core';

export type Theme = 'red' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  currentTheme = signal<Theme>(this.loadTheme());

  constructor() {
    this.applyTheme(this.currentTheme());
  }

  toggleTheme() {
    const next: Theme = this.currentTheme() === 'red' ? 'dark' : 'red';
    this.currentTheme.set(next);
    this.applyTheme(next);
    localStorage.setItem('cepheid-theme', next);
  }

  private loadTheme(): Theme {
    const saved = localStorage.getItem('cepheid-theme');
    return saved === 'red' ? 'red' : 'dark';
  }

  private applyTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }
}
