import { Component, signal, inject } from '@angular/core';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-candy-projects',
  imports: [],
  templateUrl: './candy-projects.html',
  styleUrl: './candy-projects.css',
})
export class CandyProjects {
  private soundService = inject(SoundService);
  activeProject = signal<any | null>(null);
  peppermintDark = signal<boolean>(false);

  projects = [
    {
      id: 1,
      title: 'Proyecto 1: Portal de Ooo',
      desc: 'Un portal interactivo de mapas utilizando Angular y WebGL para explorar las regiones de Ooo. Incluye bases de datos distribuidas del Dulce Reino.',
      tech: ['Angular', 'TypeScript', 'Three.js', 'Firebase'],
      github: 'https://github.com',
      demo: 'https://google.com',
      flaskColor: '#ff70a6' // Bubblegum pink
    },
    {
      id: 2,
      title: 'Proyecto 2: BMO Music Box',
      desc: 'Un sintetizador de música interactivo desarrollado en el navegador. Permite secuenciar ritmos y exportar archivos MIDI utilizando Web Audio API.',
      tech: ['TypeScript', 'Web Audio API', 'HTML5 Canvas', 'CSS3'],
      github: 'https://github.com',
      demo: 'https://google.com',
      flaskColor: '#4fbfa8' // BMO green
    },
    {
      id: 3,
      title: 'Proyecto 3: Enchiridion API',
      desc: 'Una API REST robusta y segura que indexa todas las criaturas, magias y héroes históricos de la Tierra de Ooo. Protegida con autenticación JWT.',
      tech: ['Node.js', 'Express', 'MongoDB', 'Docker'],
      github: 'https://github.com',
      demo: 'https://google.com',
      flaskColor: '#ffb300' // Jake gold
    }
  ];

  selectProject(proj: any) {
    this.activeProject.set(proj);
    this.soundService.playBmoBeep();
  }

  closeReport() {
    this.activeProject.set(null);
    this.soundService.playPortal();
  }

  togglePeppermint() {
    this.peppermintDark.update(val => !val);
    if (this.peppermintDark()) {
      this.soundService.playLichDrone();
    } else {
      this.soundService.playWenk();
    }
  }
}
