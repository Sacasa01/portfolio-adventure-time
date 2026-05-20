import { Injectable, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SoundService } from './sound.service';

@Injectable({
  providedIn: 'root'
})
export class SnailService {
  // Current section the snail is hiding in
  hidingSection = signal<string>('');
  // Coordinates of the snail in % (x, y) relative to its parent container
  snailPosition = signal<{ x: number; y: number }>({ x: 10, y: 10 });
  // Total found count
  foundCount = signal<number>(0);
  // Has it been found in the current session/section?
  isFoundInCurrentSection = signal<boolean>(false);

  private sections = ['home', 'about', 'projects', 'skills', 'contact'];

  constructor(
    private router: Router,
    private soundService: SoundService
  ) {
    // Whenever navigation completes, randomly place the snail
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.relocateSnail();
      });
  }

  relocateSnail() {
    this.isFoundInCurrentSection.set(false);
    
    // 70% chance of spawning the snail on navigation
    if (Math.random() < 0.7) {
      const currentUrl = this.router.url.replace('/', '');
      const activeSection = currentUrl === '' ? 'home' : currentUrl;
      
      // Place it in the active section
      this.hidingSection.set(activeSection);
      
      // Random coordinates (between 10% and 85% to ensure it stays on screen)
      const x = Math.floor(Math.random() * 75) + 10;
      const y = Math.floor(Math.random() * 75) + 10;
      this.snailPosition.set({ x, y });
    } else {
      this.hidingSection.set('');
    }
  }

  clickSnail() {
    if (this.isFoundInCurrentSection()) return;
    
    this.isFoundInCurrentSection.set(true);
    this.foundCount.update(count => count + 1);
    this.soundService.playBmoBeep();
    
    // Hide after finding it
    setTimeout(() => {
      this.hidingSection.set('');
    }, 1500);
  }
}
