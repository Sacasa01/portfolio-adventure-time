import { Component, inject, signal, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { I18nService } from '../../services/i18n.service';
import { TranslatePipe } from '../../services/translate.pipe';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  public themeService = inject(ThemeService);
  public i18nService = inject(I18nService);

  // States
  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  activeSection = signal('hero');

  // Navigation Links matching element IDs in index.html/app.html
  navItems = [
    { id: 'hero', labelKey: 'NAV.HERO' },
    { id: 'about', labelKey: 'NAV.ABOUT' },
    { id: 'projects', labelKey: 'NAV.PROJECTS' },
    { id: 'experience', labelKey: 'NAV.EXPERIENCE' },
    { id: 'values', labelKey: 'NAV.VALUES' },
    { id: 'contact', labelKey: 'NAV.CONTACT' }
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Detect scrolled state for navbar background transition
    if (typeof window !== 'undefined') {
      this.isScrolled.set(window.scrollY > 50);
      
      // Basic Scroll Spy to highlight active navbar item
      let currentActive = 'hero';
      for (const item of this.navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the section occupies top part of screen
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentActive = item.id;
            break;
          }
        }
      }
      this.activeSection.set(currentActive);
    }
  }

  ngOnInit() {
    this.onWindowScroll();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(val => !val);
  }

  scrollToSection(id: string, event: Event) {
    event.preventDefault();
    this.isMobileMenuOpen.set(false); // Close mobile menu if open
    
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      this.activeSection.set(id);
    }
  }
}
