import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-treehouse-home',
  imports: [RouterLink],
  templateUrl: './treehouse-home.html',
  styleUrl: './treehouse-home.css',
})
export class TreehouseHome implements OnInit, OnDestroy {
  activeCharacter = signal<'finn' | 'jake'>('finn');
  dialogText = signal<string>('¡Hola! Soy un desarrollador de software en busca de aventuras de código.');
  
  private dialogueInterval: any;

  dialogues = {
    finn: [
      '¡Hola! Soy desarrollador de software y esta es mi guarida digital.',
      '¿Listo para una aventura llena de código, TypeScript y SuperCSS?',
      '¡Explora el Dulce Reino para ver mis proyectos científicos!',
      '¡Si encuentras al caracol saludando, avísame!'
    ],
    jake: [
      '¡Yo puedo estirar mis componentes de Angular hasta donde quieras!',
      '¡El portafolio de mi hermano es el más matemático de Ooo!',
      '¡No toques ese libro negro arriba a la derecha si valoras tu piel!',
      '¿Alguien ha dicho sándwich de tocino perfecto?'
    ]
  };

  ngOnInit() {
    let index = 0;
    this.dialogueInterval = setInterval(() => {
      // Toggle character dialog
      const nextChar = this.activeCharacter() === 'finn' ? 'jake' : 'finn';
      this.activeCharacter.set(nextChar);
      
      const charDialogues = this.dialogues[nextChar];
      const randomIndex = Math.floor(Math.random() * charDialogues.length);
      this.dialogText.set(charDialogues[randomIndex]);
    }, 4500);
  }

  ngOnDestroy() {
    if (this.dialogueInterval) {
      clearInterval(this.dialogueInterval);
    }
  }

  switchCharacter(char: 'finn' | 'jake') {
    this.activeCharacter.set(char);
    const charDialogues = this.dialogues[char];
    const randomIndex = Math.floor(Math.random() * charDialogues.length);
    this.dialogText.set(charDialogues[randomIndex]);
  }
}
