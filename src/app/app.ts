import { Component, signal, inject } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BmoWidget } from './components/bmo-widget/bmo-widget';
import { SoundService } from './services/sound.service';
import { SnailService } from './services/snail.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, BmoWidget],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  public soundService = inject(SoundService);
  public snailService = inject(SnailService);
  private router = inject(Router);

  isMuted = signal(false);
  currentRoute = signal('home');

  constructor() {
    // Listen to route changes to track the active section
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects.split('?')[0].replace('/', '');
        this.currentRoute.set(url === '' ? 'home' : url);
      });
  }

  toggleLichMode() {
    this.soundService.isLichActive.update(val => !val);
    const body = document.body;
    if (this.soundService.isLichActive()) {
      body.classList.add('lich-theme');
      this.soundService.playLichDrone();
    } else {
      body.classList.remove('lich-theme');
      this.soundService.playPortal();
    }
  }

  toggleMute() {
    const muted = this.soundService.toggleMute();
    this.isMuted.set(muted);
  }

  playNavSound() {
    this.soundService.playPortal();
  }
}
