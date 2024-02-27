import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth/auth-layout.component';
import { DashboardLayoutComponent } from './dashboard/dashboard.layout';
import { authGuard, dashboardGuard } from './dashboard/dashboard.guard';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./auth/pages/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  },
  {
    path: 'dashboard',
    canActivate: [dashboardGuard],
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./dashboard/pages/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'users',
        canActivate: [authGuard],
        loadComponent: () => import('./dashboard/pages/user/user.component').then(m => m.UserComponent)
      },
      {
        path: 'sales',
        loadComponent: () => import('./dashboard/pages/sale/sale.component').then(m => m.SaleComponent)
      },
      {
        path: 'products',
        canActivate: [authGuard],
        loadComponent: () => import('./dashboard/pages/product/product.component').then(m => m.ProductComponent)
      },
      {
        path: 'sales/new',
        loadComponent: () => import('./dashboard/pages/sale/new-sale/new-sale.component').then(m => m.NewSaleComponent)
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard/home'
  }
];
