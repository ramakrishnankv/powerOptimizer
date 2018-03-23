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
import { NonGroupDevicesComponent } from './views/pages/groups/non-group-devices/non-group-devices.component';
import { GroupDevicesComponent } from './views/pages/groups/group-devices/group-devices.component';
import { EmptyGroupsComponent } from './views/pages/groups/empty-groups/empty-groups.component';

export const AppRoutes: Routes = [
  {path: '', children: [{path: '', component: LoginComponent}, {path: 'login', component: LoginComponent}]},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'devices', component: DevicesComponent},
  {path: 'groups', component: GroupsComponent, children: [
                    {path: '', component: NonGroupDevicesComponent},
                    {path: 'nonGroupDevices', component: NonGroupDevicesComponent},
                    {path: 'groupDevices', component: GroupDevicesComponent},
                    {path: 'emptyGroups', component: EmptyGroupsComponent}
  ]},
  {path: 'issues', component: IssuesComponent},
  {path: 'home', component: HomeComponent},
  {path: '**', component: PageNotFoundComponent}
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
