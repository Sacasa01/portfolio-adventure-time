import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../services/translate.pipe';
import { ScrollRevealDirective } from '../../services/scroll-reveal.directive';

interface ValueItem {
  id: string;
  icon: 'minimalism' | 'detail' | 'learning' | 'creative' | 'aesthetic' | 'cooperative';
}

@Component({
  selector: 'app-values-section',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ScrollRevealDirective],
  templateUrl: './values-section.component.html',
  styleUrl: './values-section.component.css'
})
export class ValuesSectionComponent {
  values: ValueItem[] = [
    { id: 'VAL_1', icon: 'minimalism' },
    { id: 'VAL_2', icon: 'detail' },
    { id: 'VAL_3', icon: 'learning' },
    { id: 'VAL_4', icon: 'creative' },
    { id: 'VAL_5', icon: 'aesthetic' },
    { id: 'VAL_6', icon: 'cooperative' }
  ];
}
