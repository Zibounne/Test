import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})

export class TruncatePipe implements PipeTransform {

  transform(value: string, maxWords: number, maxLetters: number): string {
    if (!value) return '';

    // Vérification par nombre de mots
    const words = value.split(' ');
    if (words.length > maxWords) {
      // Tronquer par mots si on dépasse la limite
      return words.slice(0, maxWords).join(' ') + '...';
    }

    // Vérification par nombre de lettres
    if (value.length > maxLetters) {
      // Tronquer par lettres si on dépasse la limite de lettres
      return value.slice(0, maxLetters) + '...';
    }

    // Si aucune condition de troncature n'est atteinte
    return value;
  }

}