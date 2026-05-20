import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../services/translate.pipe';
import { ScrollRevealDirective } from '../../services/scroll-reveal.directive';

interface Project {
  id: string; // matches localization keys
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  image: string;
  svgIcon: 'ecommerce' | 'anime' | 'task' | 'canvas';
}

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ScrollRevealDirective],
  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.css'
})
export class ProjectsSectionComponent {
  projects: Project[] = [
    {
      id: 'PROJ_1',
      technologies: ['Angular', 'CSS Grid', 'RxJS'],
      githubUrl: 'https://github.com/Sacasa01',
      liveUrl: 'https://github.com/Sacasa01',
      image: 'photos/projects/proj1.jpg',
      svgIcon: 'ecommerce'
    },
    {
      id: 'PROJ_2',
      technologies: ['TypeScript', 'Public API', 'CSS Flexbox'],
      githubUrl: 'https://github.com/Sacasa01',
      liveUrl: 'https://github.com/Sacasa01',
      image: 'photos/projects/proj2.jpg',
      svgIcon: 'anime'
    },
    {
      id: 'PROJ_3',
      technologies: ['Angular Signals', 'Local Storage'],
      githubUrl: 'https://github.com/Sacasa01',
      liveUrl: 'https://github.com/Sacasa01',
      image: 'photos/projects/proj3.jpg',
      svgIcon: 'task'
    },
    {
      id: 'PROJ_4',
      technologies: ['HTML5 Canvas', 'Vanilla JS', 'SVG'],
      githubUrl: 'https://github.com/Sacasa01',
      liveUrl: 'https://github.com/Sacasa01',
      image: 'photos/projects/proj4.jpg',
      svgIcon: 'canvas'
    }
  ];
}
