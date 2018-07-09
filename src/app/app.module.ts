import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, Headers, RequestOptions} from '@angular/http';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';

import { LoginComponent } from './views/pages/login/login.component';
import { PageNotFoundComponent } from './views/pages/page-not-found/page-not-found.component';
import { HeaderPrimaryComponent } from './views/components/header-primary/header-primary.component';
import { FooterPrimaryComponent } from './views/components/footer-primary/footer-primary.component';
import { OrgLogoComponent } from './views/components/org-logo/org-logo.component';
import { DashboardComponent } from './views/pages/dashboard/dashboard.component';
import { PagePrimeComponent } from './views/templates/page-prime/page-prime.component';
import { NavbarPrimeComponent } from './views/components/navbar-prime/navbar-prime.component';
import { ProgressBarComponent } from './views/components/progress-bar/progress-bar.component';

import { CollapseModule, ModalModule, ProgressbarModule, BsDatepickerModule, TimepickerModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { CookieService } from 'ngx-cookie-service';
import { TreeModule } from 'angular-tree-component';

import { NavbarIconicComponent } from './views/components/navbar-iconic/navbar-iconic.component';
import { ChartLineComponent } from './views/components/chart-line/chart-line.component';
import { ChartDoughnutComponent } from './views/components/chart-doughnut/chart-doughnut.component';
import { TabularContentPrimaryComponent } from './views/components/tabular-content-primary/tabular-content-primary.component';
import { NavbarTabsComponent } from './views/components/navbar-tabs/navbar-tabs.component';

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

import { UserDataModel } from './models/user/user-data.model';
import { ActivitySummaryModel } from './models/activity-summary.model';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ApiService } from './services/api.service';
import { DataPublishService } from './services/data-publish.service';
import { DataService } from './services/data.service';
import { AuthService } from './services/authentication/auth.service';
import { CreateScheduleTemplateComponent } from './views/components/create-schedule-template/create-schedule-template.component';
import { ModalPopupComponent } from './views/templates/modal-popup/modal-popup.component';
import { UserListComponent } from './views/pages/admin/user-list/user-list.component';
import { DeviceListComponent } from './views/pages/admin/device-list/device-list.component';
import { CustomerListComponent } from './views/pages/admin/customer-list/customer-list.component';
import { CustomFilterPipe } from './views/components/custom-filter.pipe';
import { MapComponent } from './views/components/map/map.component';
import { AgmCoreModule } from '@agm/core';
import { TabularDataSearchFilterPipe } from './helpers/tabular-data-search-filter.pipe';
import { TabularSearchFieldComponent } from './views/components/tabular-search-field/tabular-search-field.component';
import { TreeSelectComponent } from './views/components/tree-select/tree-select.component';
import { AddGroupTemplateComponent } from './views/components/add-group-template/add-group-template.component';
import { ManageIssueComponent } from './views/pages/manage-issue/manage-issue.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrgLogoComponent,
    DashboardComponent,
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
    EditDeviceComponent,
    CreateScheduleTemplateComponent,
    ModalPopupComponent,
	  UserListComponent,
    DeviceListComponent,
    CustomerListComponent,
    CustomFilterPipe,
    MapComponent,
    TabularDataSearchFilterPipe,
    TabularSearchFieldComponent,
    TreeSelectComponent,
    AddGroupTemplateComponent,
    ManageIssueComponent
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
    TimepickerModule.forRoot(),
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyAi5E_iWyS12-xUP2mCM3EXWyL3nEUTl4Y'

    }),
    TreeModule
  ],
  providers: [ UserDataModel, CookieService, ApiService, DataPublishService,DataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
