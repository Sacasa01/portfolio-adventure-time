import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../services/translate.pipe';
import { ScrollRevealDirective } from '../../services/scroll-reveal.directive';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ScrollRevealDirective],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.css'
})
export class AboutSectionComponent {
  public i18nService = inject(I18nService);

  // Tags will be read dynamically from translation or hardcoded list if desired.
  // Reading from translation keys allows bilingual support for the tags!
  // In en.ts we have ABOUT.TAGS: ['Angular', 'TypeScript', 'Clean CSS', 'UI/UX Design', 'Performance', 'Git Workflow']
  // We can access it directly from I18nService or map translation keys.
  // Mapped translation keys is highly robust!
  getTags(): string[] {
    const tagsObj = this.i18nService.translate('ABOUT.TAGS');
    // If it resolves to an array (from our locale dictionaries), return it.
    if (Array.isArray(tagsObj)) {
      return tagsObj;
    }
    // Fallback list
    return ['Angular', 'TypeScript', 'CSS3', 'UI/UX', 'Performance', 'Git'];
  }
}
