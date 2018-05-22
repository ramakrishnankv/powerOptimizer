import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { LoginComponent } from './views/pages/login/login.component';
import { DashboardComponent } from './views/pages/dashboard/dashboard.component';
import { PageNotFoundComponent } from './views/pages/page-not-found/page-not-found.component';
import { DevicesComponent } from './views/pages/devices/devices.component';
import { IssuesComponent } from './views/pages/issues/issues.component';
import { GroupsComponent } from './views/pages/groups/groups.component';
import { NonGroupDevicesComponent } from './views/pages/groups/non-group-devices/non-group-devices.component';
import { GroupDevicesComponent } from './views/pages/groups/group-devices/group-devices.component';
import { EmptyGroupsComponent } from './views/pages/groups/empty-groups/empty-groups.component';
import { SchedulesComponent } from './views/pages/schedules/schedules.component';
import { NoScheduleDevicesComponent } from './views/pages/schedules/no-schedule-devices/no-schedule-devices.component';
import { ConflictDevicesComponent } from './views/pages/schedules/conflict-devices/conflict-devices.component';
import { AllDevicesComponent } from './views/pages/schedules/all-devices/all-devices.component';
import { AddDeviceComponent } from './views/pages/admin/add-device/add-device.component';
import { AddCustomerComponent } from './views/pages/admin/add-customer/add-customer.component';
import { AddUserComponent } from './views/pages/admin/add-user/add-user.component';
import { EditDeviceComponent } from './views/pages/admin/edit-device/edit-device.component';
import { UserListComponent } from './views/pages/admin/user-list/user-list.component';
import { DeviceListComponent } from './views/pages/admin/device-list/device-list.component';
import { CustomerListComponent } from './views/pages/admin/customer-list/customer-list.component';
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
  {path: 'schedules', component: SchedulesComponent, children: [
                    {path: '', component: NoScheduleDevicesComponent},
                    {path: 'noScheduleDevices', component: NoScheduleDevicesComponent},
                    {path: 'conflictDevices', component: ConflictDevicesComponent},
                    {path: 'allDevices', component: AllDevicesComponent}
  ]},
  {path: 'admin/addDevice', component: AddDeviceComponent},
  {path: 'admin/customers', component: CustomerListComponent},
  {path: 'admin/addCustomer/:ID', component: AddCustomerComponent},
  {path: 'admin/addUser/:ID', component: AddUserComponent},
  {path: 'admin/users', component: UserListComponent},
  {path: 'admin/editDevice/:Id', component: EditDeviceComponent},
  {path: 'admin/device', component: DeviceListComponent},
  {path: '**', component: PageNotFoundComponent}
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
