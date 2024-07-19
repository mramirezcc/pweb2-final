import { Component } from '@angular/core';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})
export class AdvancedSearchComponent {
  searchData = {
    name: '',
    category: '',
    author: '',
    editorial: '',
    yearFrom: null,
    yearTo: null,
    priceMin: null,
    priceMax: null
  };

  onSearch() {
    console.log(this.searchData);
  }
}
