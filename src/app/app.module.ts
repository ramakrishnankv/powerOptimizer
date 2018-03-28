import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
/*
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule } from '@angular/material';
*/

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { LoginComponent } from './views/pages/login/login.component';
import { HomeComponent } from './views/pages/home/home.component';
import { PageNotFoundComponent } from './views/pages/page-not-found/page-not-found.component';
import { HeaderPrimaryComponent } from './views/components/header-primary/header-primary.component';
import { FooterPrimaryComponent } from './views/components/footer-primary/footer-primary.component';
import { OrgLogoComponent } from './views/components/org-logo/org-logo.component';
import { DashboardComponent } from './views/pages/dashboard/dashboard.component';
import { PagePrimeComponent } from './views/templates/page-prime/page-prime.component';
import { NavbarPrimeComponent } from './views/components/navbar-prime/navbar-prime.component';
import { ProgressBarComponent } from './views/components/progress-bar/progress-bar.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap';
import { ProgressbarModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { NavbarIconicComponent } from './views/components/navbar-iconic/navbar-iconic.component';
import { DevicesComponent } from './views/pages/devices/devices.component';
import { ChartLineComponent } from './views/components/chart-line/chart-line.component';
import { ChartDoughnutComponent } from './views/components/chart-doughnut/chart-doughnut.component';
import { TabularContentPrimaryComponent } from './views/components/tabular-content-primary/tabular-content-primary.component';
import { IssuesComponent } from './views/pages/issues/issues.component';
import { GroupsComponent } from './views/pages/groups/groups.component';
import { NonGroupDevicesComponent } from './views/pages/groups/non-group-devices/non-group-devices.component';
import { GroupDevicesComponent } from './views/pages/groups/group-devices/group-devices.component';
import { EmptyGroupsComponent } from './views/pages/groups/empty-groups/empty-groups.component';
import { NavbarTabsComponent } from './views/components/navbar-tabs/navbar-tabs.component';
import { SchedulesComponent } from './views/pages/schedules/schedules.component';
import { NoScheduleDevicesComponent } from './views/pages/schedules/no-schedule-devices/no-schedule-devices.component';
import { ConflictDevicesComponent } from './views/pages/schedules/conflict-devices/conflict-devices.component';
import { AllDevicesComponent } from './views/pages/schedules/all-devices/all-devices.component';
import { AddDeviceComponent } from './views/pages/admin/add-device/add-device.component';
import { AddCustomerComponent } from './views/pages/admin/add-customer/add-customer.component';
import { AddUserComponent } from './views/pages/admin/add-user/add-user.component';
import { EditDeviceComponent } from './views/pages/admin/edit-device/edit-device.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrgLogoComponent,
    DashboardComponent,
    HomeComponent,
    PageNotFoundComponent,
    HeaderPrimaryComponent,
    FooterPrimaryComponent,
    PagePrimeComponent,
    NavbarPrimeComponent,
    ProgressBarComponent,
    NavbarIconicComponent,
    DevicesComponent,
    ChartLineComponent,
    ChartDoughnutComponent,
    TabularContentPrimaryComponent,
    IssuesComponent,
    GroupsComponent,
    NonGroupDevicesComponent,
    GroupDevicesComponent,
    EmptyGroupsComponent,
    NavbarTabsComponent,
    SchedulesComponent,
    NoScheduleDevicesComponent,
    ConflictDevicesComponent,
    AllDevicesComponent,
    AddDeviceComponent,
    AddCustomerComponent,
    AddUserComponent,
    EditDeviceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRouting,
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
