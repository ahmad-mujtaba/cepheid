import { Component, inject } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private themeService = inject(ThemeService);
  currentTheme = this.themeService.currentTheme;

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
