import { Component, signal, inject } from '@angular/core';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-marceline-skills',
  imports: [],
  templateUrl: './marceline-skills.html',
  styleUrl: './marceline-skills.css',
})
export class MarcelineSkills {
  private soundService = inject(SoundService);
  activeSkill = signal<any | null>(null);

  skills = [
    {
      name: 'Angular',
      level: 90,
      quote: 'Angular... bastante potente y estructurado. Me recuerda a componer un tema con bajo y batería: todo tiene que estar en su sitio.',
      icon: '🎸'
    },
    {
      name: 'TypeScript',
      level: 85,
      quote: 'TypeScript... me gusta que sea estricto. Evita sorpresas desagradables en el código, como encontrarse al Rey Hielo flotando en tu salón.',
      icon: '⚡'
    },
    {
      name: 'SuperCSS',
      level: 95,
      quote: 'CSS... me permite pintar la web a mi antojo, especialmente de rojo oscuro. Sombras, degradados y animaciones que fluyen en la oscuridad.',
      icon: '🧛‍♀️'
    },
    {
      name: 'Node.js',
      level: 80,
      quote: 'Node.js... backend rápido e invisible en la sombra, moviendo datos como un murciélago gigante en el cielo nocturno.',
      icon: '🦇'
    }
  ];

  selectSkill(skill: any) {
    this.activeSkill.set(skill);
    this.soundService.playGuitarPluck();
  }

  closeSkill() {
    this.activeSkill.set(null);
    this.soundService.playPortal();
  }
}
