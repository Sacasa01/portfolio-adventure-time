import { Pipe, PipeTransform, inject } from '@angular/core';
import { I18nService } from './i18n.service';

@Pipe({
  name: 'translate',
  pure: false, // Set to false so it re-evaluates when language signal changes
  standalone: true
})
export class TranslatePipe implements PipeTransform {
  private i18nService = inject(I18nService);

  transform(key: string): string {
    return this.i18nService.translate(key);
  }
}
