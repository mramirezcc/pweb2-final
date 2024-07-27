import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Compra } from '../compra.model';

@Component({
  selector: 'app-favorite-user',
  templateUrl: './favorite-user.component.html',
  styleUrls: ['./favorite-user.component.css']
})
export class FavoriteUserComponent implements OnChanges {
  @Input() compras: Compra[] = [];
  
  mostFrequentAuthor: string = '';
  mostFrequentGenre: string = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['compras'] && this.compras.length > 0) {
      console.log("Compras recibidas en FavoriteUserComponent: ", this.compras);
      this.mostFrequentAuthor = this.getMostFrequent(this.compras.map(compra => compra.author));
      this.mostFrequentGenre = this.getMostFrequent(this.compras.map(compra => compra.cathegory));
      console.log("El autor mas frecuente es " + this.mostFrequentAuthor);
      console.log("El genero mas frecuente es " + this.mostFrequentGenre);
    }
  }

  getMostFrequent(arr: string[]): string {
    const frequencyMap: { [key: string]: number } = {};
    arr.forEach(item => {
      if (frequencyMap[item]) {
        frequencyMap[item]++;
      } else {
        frequencyMap[item] = 1;
      }
    });
    return Object.keys(frequencyMap).reduce((a, b) => frequencyMap[a] > frequencyMap[b] ? a : b);
  }
}
