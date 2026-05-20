import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../services/translate.pipe';
import { ScrollRevealDirective } from '../../services/scroll-reveal.directive';
import { I18nService } from '../../services/i18n.service';

interface TimelineItem {
  DATE: string;
  TITLE: string;
  SUB: string;
  DESC: string;
}

@Component({
  selector: 'app-experience-section',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ScrollRevealDirective],
  templateUrl: './experience-section.component.html',
  styleUrl: './experience-section.component.css'
})
export class ExperienceSectionComponent {
  private i18nService = inject(I18nService);

  getTimelineItems(): TimelineItem[] {
    const items = this.i18nService.translate('EXPERIENCE.ITEMS');
    if (Array.isArray(items)) {
      return items;
    }
    return [];
  }
}
