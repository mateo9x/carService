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
    VehicleEditDialogComponent
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
        MatTooltipModule
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
    AppGuard, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
