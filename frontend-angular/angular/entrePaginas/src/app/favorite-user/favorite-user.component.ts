import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite-user',
  templateUrl: './favorite-user.component.html',
  styleUrls: ['./favorite-user.component.css']
})
export class FavoriteUserComponent implements OnInit {
  @Input() compras: { title: string, author: string, genre: string, date: string }[] = [];
  
  mostFrequentAuthor: string = '';
  mostFrequentGenre: string = '';

  ngOnInit() {
    this.mostFrequentAuthor = this.getMostFrequent(this.compras.map(compra => compra.author));
    this.mostFrequentGenre = this.getMostFrequent(this.compras.map(compra => compra.genre));
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
