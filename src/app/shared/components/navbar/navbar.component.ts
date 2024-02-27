import { Component, OnInit, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, ButtonModule],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent implements OnInit {

  items: MenuItem[] = [];
  router = inject(Router)

  ngOnInit() {
    this.items = [
      {
        label: 'Usuarios',
        icon: 'pi pi-fw pi-user',
        routerLink: '/dashboard/users',
        disabled: localStorage.getItem('role') === 'user'
      },
      {
        label: 'Ventas',
        icon: 'pi pi-fw pi-shopping-cart',
        routerLink: '/dashboard/sales'
      },
      {
        label: 'Productos',
        icon: 'pi pi-fw pi-tags',
        routerLink: '/dashboard/products',
        disabled: localStorage.getItem('role') === 'user'
      }
    ];
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/auth/login']);
  }

}
