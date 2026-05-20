import { Component, signal, inject } from '@angular/core';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-bmo-widget',
  imports: [],
  templateUrl: './bmo-widget.html',
  styleUrl: './bmo-widget.css',
})
export class BmoWidget {
  public soundService = inject(SoundService);
  
  screenState = signal<'face' | 'joke' | 'dance' | 'game'>('face');
  currentJoke = signal('');
  gameState = signal<'start' | 'playing' | 'win'>('start');
  gameNumber = signal(0);

  jokes = [
    '¿Por qué lloraba Mentita? ¡Porque se sentía deshecho!',
    '¿Qué hace Jake cuando tiene hambre? ¡Se estira hasta la nevera!',
    '¿Cuál es el colmo de Gunter? ¡Resbalar en el hielo!',
    'BMO no es solo una consola... ¡BMO es un amigo real!'
  ];

  clickBlue() {
    if (this.soundService.isLichActive()) {
      this.soundService.playStatic();
      return;
    }
    this.soundService.playBmoBeep();
    
    // Show Jokes
    if (this.screenState() !== 'joke') {
      this.screenState.set('joke');
      this.nextJoke();
    } else {
      this.nextJoke();
    }
  }

  clickGreen() {
    if (this.soundService.isLichActive()) {
      this.soundService.playStatic();
      return;
    }
    this.soundService.playBmoBeep();
    
    // Show Dance
    this.screenState.set(this.screenState() === 'dance' ? 'face' : 'dance');
  }

  clickRed() {
    if (this.soundService.isLichActive()) {
      this.soundService.playStatic();
      return;
    }
    this.soundService.playBmoBeep();
    
    // Show Game
    if (this.screenState() !== 'game') {
      this.screenState.set('game');
      this.startGame();
    } else {
      this.screenState.set('face');
    }
  }

  nextJoke() {
    const randomIndex = Math.floor(Math.random() * this.jokes.length);
    this.currentJoke.set(this.jokes[randomIndex]);
  }

  startGame() {
    this.gameState.set('playing');
    this.gameNumber.set(Math.floor(Math.random() * 5) + 1); // Guess 1 to 5
  }

  makeGuess(num: number) {
    if (num === this.gameNumber()) {
      this.gameState.set('win');
      this.soundService.playPortal();
    } else {
      this.soundService.playWenk();
      this.startGame(); // Reset number
    }
  }

  resetBmo() {
    this.screenState.set('face');
    this.soundService.playBmoBeep();
  }
}
