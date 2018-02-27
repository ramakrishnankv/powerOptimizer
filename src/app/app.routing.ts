import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { LoginComponent } from './views/pages/login/login.component';
import { DashboardComponent } from './views/pages/dashboard/dashboard.component';
import { HomeComponent } from './views/pages/home/home.component';
import { PageNotFoundComponent } from './views/pages/page-not-found/page-not-found.component';

export const AppRoutes: Routes = [
  {path: '', children: [{path: '', component: LoginComponent}, {path: 'login', component: LoginComponent}]},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'home', component: HomeComponent},
  {path: '**', component: PageNotFoundComponent}
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
