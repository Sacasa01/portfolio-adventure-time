import { Component, signal, inject } from '@angular/core';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-prismo-about',
  imports: [],
  templateUrl: './prismo-about.html',
  styleUrl: './prismo-about.css',
})
export class PrismoAbout {
  private soundService = inject(SoundService);
  activeWish = signal<number | null>(null);

  wishes = [
    {
      id: 1,
      title: 'Deseo 1: ¿Quién soy?',
      text: 'Concedido... Eres un desarrollador de software con sede en Ooo, apasionado de la creación de experiencias web mágicas. Te encanta resolver acertijos de código, estructurar datos y dar vida a diseños con CSS sofisticado.'
    },
    {
      id: 2,
      title: 'Deseo 2: Mi Trayectoria',
      text: 'Concedido... Has recorrido los reinos de la ingeniería informática, dominando Angular, TypeScript y la lógica de programación. Has participado en diversas misiones construyendo aplicaciones robustas y escalables.'
    },
    {
      id: 3,
      title: 'Deseo 3: Metas Futuras',
      text: 'Concedido... Tu destino es seguir explorando las fronteras del desarrollo web, dominar arquitecturas en la nube y diseñar interfaces inmersivas que dejen a los usuarios asombrados.'
    }
  ];

  selectWish(wishId: number) {
    this.activeWish.set(wishId);
    this.soundService.playBmoBeep();
  }

  resetWish() {
    this.activeWish.set(null);
    this.soundService.playPortal();
  }
}
