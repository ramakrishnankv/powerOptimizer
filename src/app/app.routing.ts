import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { LoginComponent } from './views/pages/login/login.component';
import { DashboardComponent } from './views/pages/dashboard/dashboard.component';
import { HomeComponent } from './views/pages/home/home.component';
import { PageNotFoundComponent } from './views/pages/page-not-found/page-not-found.component';
import { DevicesComponent } from './views/pages/devices/devices.component';
import { IssuesComponent } from './views/pages/issues/issues.component';
import { GroupsComponent } from './views/pages/groups/groups.component';

export const AppRoutes: Routes = [
  {path: '', children: [{path: '', component: LoginComponent}, {path: 'login', component: LoginComponent}]},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'devices', component: DevicesComponent},
  {path: 'groups', children: [
                    {path: '', component: GroupsComponent},
                    {path: 'nonGroupDevices', component: GroupsComponent},
                    {path: 'groupDevices', component: GroupsComponent},
                    {path: 'emptyGroup', component: GroupsComponent}
  ]},
  {path: 'issues', component: IssuesComponent},
  {path: 'home', component: HomeComponent},
  {path: '**', component: PageNotFoundComponent}
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
