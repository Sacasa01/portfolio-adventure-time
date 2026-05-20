import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '../../services/translate.pipe';
import { ScrollRevealDirective } from '../../services/scroll-reveal.directive';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe, ScrollRevealDirective],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.css'
})
export class ContactSectionComponent {
  private fb = inject(FormBuilder);
  
  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
    // Honeypot field (hidden from users, if filled we reject the submission as bot)
    phone: ['']
  });

  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    // Honeypot check
    const honeypot = this.contactForm.value.phone;
    if (honeypot) {
      console.warn('Spam bot detected!');
      this.submitSuccess = true; // Pretend it succeeded to confuse the bot
      this.contactForm.reset();
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    // Simulate sending email (Formspree/Formsubmit or backend integration)
    // Santiago can easily change this to direct HTTP call later.
    setTimeout(() => {
      this.isSubmitting = false;
      this.submitSuccess = true;
      this.contactForm.reset();
    }, 1500);
  }
}
