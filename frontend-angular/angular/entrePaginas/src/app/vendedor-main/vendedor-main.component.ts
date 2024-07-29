import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendedor-main',
  templateUrl: './vendedor-main.component.html',
  styleUrls: ['./vendedor-main.component.css']
})
export class VendedorMainComponent implements OnInit {
  activeMenu: string = 'overview';

  constructor(private router: Router) {}

  ngOnInit() {
    const token = sessionStorage.getItem('vendedorToken');
    if (!token) {
      this.router.navigate(['/']);
    }
  }

  menuChange(menu: string) {
    this.activeMenu = menu;
    console.log("Menu activo: " + this.activeMenu);
  }

  @HostListener('window:beforeunload', ['$event'])
  clearSessionStorage(event: BeforeUnloadEvent) {
    sessionStorage.removeItem('vendedorToken');
  }
}
