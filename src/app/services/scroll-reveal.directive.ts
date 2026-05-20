import { Directive, ElementRef, OnInit, OnDestroy, Input, Renderer2, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  /**
   * Animation style class: 'reveal-fade-up', 'reveal-fade-in', etc.
   * Defaults to 'reveal-fade-up'.
   */
  @Input() animationClass = 'reveal-fade-up';

  /**
   * Stagger delay class if needed: 'stagger-1', 'stagger-2', etc.
   */
  @Input() staggerClass = '';

  /**
   * Intersection threshold (0.0 to 1.0)
   */
  @Input() threshold = 0.15;

  ngOnInit() {
    // Only run in browser platform
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const nativeEl = this.el.nativeElement;

    // Apply baseline reveal classes
    this.renderer.addClass(nativeEl, 'reveal');
    if (this.animationClass) {
      this.renderer.addClass(nativeEl, this.animationClass);
    }
    if (this.staggerClass) {
      this.renderer.addClass(nativeEl, this.staggerClass);
    }

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      this.renderer.addClass(nativeEl, 'active');
      return;
    }

    // Initialize Intersection Observer
    if (typeof IntersectionObserver !== 'undefined') {
      const options = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: this.threshold
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.renderer.addClass(nativeEl, 'active');
            // Unobserve after revealing to prevent repeated animations
            this.observer?.unobserve(nativeEl);
          }
        });
      }, options);

      this.observer.observe(nativeEl);
    } else {
      // Fallback if IntersectionObserver is not supported
      this.renderer.addClass(nativeEl, 'active');
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
