import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-ice-king-contact',
  imports: [FormsModule],
  templateUrl: './ice-king-contact.html',
  styleUrl: './ice-king-contact.css',
})
export class IceKingContact {
  private soundService = inject(SoundService);

  name = signal('');
  email = signal('');
  message = signal('');
  isSent = signal(false);
  gunterText = signal('');

  private gunterPhrases = [
    'Wenk!',
    'Wenk Wenk!',
    'WENK!!!',
    '¿Wenk?',
    '*mira fijamente*',
    '¡Wenk Wenk Wenk!'
  ];
  private gunterTimeout: any;

  clickGunter() {
    this.soundService.playWenk();
    
    // Choose a random wenk phrase
    const randomIndex = Math.floor(Math.random() * this.gunterPhrases.length);
    this.gunterText.set(this.gunterPhrases[randomIndex]);

    // Clear speech bubble after 1.5 seconds
    if (this.gunterTimeout) {
      clearTimeout(this.gunterTimeout);
    }
    this.gunterTimeout = setTimeout(() => {
      this.gunterText.set('');
    }, 1500);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (!this.name() || !this.email() || !this.message()) return;

    this.isSent.set(true);
    this.soundService.playPortal();

    // Reset form after a small delay
    setTimeout(() => {
      this.name.set('');
      this.email.set('');
      this.message.set('');
      this.isSent.set(false);
    }, 4000);
  }
}
