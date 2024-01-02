import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SignInComponent} from './components/authentication/sign-in/sign-in.component';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SignUpComponent} from './components/authentication/sign-up/sign-up.component';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import {AppInterceptor} from './config/app.interceptor';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AppGuard} from './config/app.guard';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {
  ErrorStateMatcher,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  ShowOnDirtyErrorStateMatcher
} from '@angular/material/core';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import {NotFoundComponent} from './components/handlers/not-found/not-found.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {VehicleAddDialogComponent} from './components/vehicles/add-dialog/vehicle-add-dialog.component';
import {DatePipe} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {ProfileComponent} from './components/profile/profile.component';
import {UpdatePasswordComponent} from './components/profile/update-password/update-password.component';
import {AboutMeComponent} from './components/profile/about-me/about-me.component';
import {ResetPasswordComponent} from './components/authentication/reset-password/reset-password.component';
import {NewPasswordComponent} from './components/authentication/new-password/new-password.component';
import {SideMenuComponent} from './components/side-menu/side-menu.component';
import {PreferencesComponent} from './components/profile/preferences/preferences.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MyVehiclesComponent} from './components/vehicles/my-vehicles/my-vehicles.component';
import {MyVehicleCardComponent} from './components/vehicles/my-vehicles/my-vehicle-card/my-vehicle-card.component';
import {VehicleEditDialogComponent} from './components/vehicles/edit-dialog/vehicle-edit-dialog.component';
import {MyInsurancesComponent} from './components/insurance/my-insurances/my-insurances.component';
import {InsuranceAddDialogComponent} from './components/insurance/add-dialog/insurance-add-dialog.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MyInsuranceCardComponent} from './components/insurance/my-insurance-card/my-insurance-card.component';
import {MyInspectionsComponent} from './components/inspection/my-inspections/my-inspections.component';
import {MyInspectionCardComponent} from './components/inspection/my-inspection-card/my-inspection-card.component';
import {InspectionAddDialogComponent} from './components/inspection/add-dialog/inspection-add-dialog.component';
import {
  InspectionUpdateMileageDialogComponent
} from './components/inspection/update-mileage-dialog/inspection-update-mileage-dialog.component';
import {MyExpensesComponent} from './components/expension/my-expenses/my-expenses.component';
import {ExpensionAddDialogComponent} from './components/expension/add-dialog/expension-add-dialog.component';
import {MyExpensionCardComponent} from './components/expension/my-expension-card/my-expension-card.component';
import {AttachmentPipe} from './util/pipes/attachment.pipe';
import {ConfirmDialogComponent} from './components/util/confirm-dialog.component';
import {ReportsComponent} from './components/reports/reports.component';
import {TimelineComponent} from './components/timeline/timeline.component';
import {NgxTimelineModule} from '@frxjs/ngx-timeline';
import {MatListModule} from '@angular/material/list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MobileSideMenuComponent} from './components/side-menu/mobile/mobile-side-menu.component';
import {SchedulerComponent} from './components/scheduler/scheduler.component';
import {SchedulerAddDialogComponent} from './components/scheduler/scheduler-add-dialog/scheduler-add-dialog.component';
import {
  SchedulerEditDialogComponent
} from './components/scheduler/scheduler-edit-dialog/scheduler-edit-dialog.component';
import {NgxMaskDirective, provideEnvironmentNgxMask} from 'ngx-mask';
import {MatBadgeModule} from '@angular/material/badge';
import {NotifiesComponent} from './components/notifies/notifies.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    WelcomeComponent,
    SignUpComponent,
    NotFoundComponent,
    VehicleAddDialogComponent,
    ProfileComponent,
    UpdatePasswordComponent,
    AboutMeComponent,
    ResetPasswordComponent,
    NewPasswordComponent,
    SideMenuComponent,
    PreferencesComponent,
    MyVehiclesComponent,
    MyVehicleCardComponent,
    VehicleEditDialogComponent,
    MyInsurancesComponent,
    InsuranceAddDialogComponent,
    MyInsuranceCardComponent,
    MyInspectionsComponent,
    MyInspectionCardComponent,
    InspectionAddDialogComponent,
    InspectionUpdateMileageDialogComponent,
    MyExpensesComponent,
    ExpensionAddDialogComponent,
    MyExpensionCardComponent,
    ConfirmDialogComponent,
    ReportsComponent,
    TimelineComponent,
    MobileSideMenuComponent,
    SchedulerComponent,
    SchedulerAddDialogComponent,
    SchedulerEditDialogComponent,
    NotifiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTooltipModule,
    MatCheckboxModule,
    AttachmentPipe,
    NgxTimelineModule,
    MatListModule,
    MatSlideToggleModule,
    NgxMaskDirective,
    MatBadgeModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true},
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
        duration: 4500,
        horizontalPosition: "center",
        verticalPosition: "top"
      }
    },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'},
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
    provideEnvironmentNgxMask(),
    AppGuard, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
