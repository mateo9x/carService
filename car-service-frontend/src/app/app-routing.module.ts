import {inject, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from './components/authentication/sign-in/sign-in.component';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {SignUpComponent} from './components/authentication/sign-up/sign-up.component';
import {AppGuard} from './config/app.guard';
import {NotFoundComponent} from './components/handlers/not-found/not-found.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ResetPasswordComponent} from './components/authentication/reset-password/reset-password.component';
import {NewPasswordComponent} from './components/authentication/new-password/new-password.component';
import {MyVehiclesComponent} from './components/vehicles/my-vehicles/my-vehicles.component';
import {MyInsurancesComponent} from './components/insurance/my-insurances/my-insurances.component';
import {MyInspectionsComponent} from './components/inspection/my-inspections/my-inspections.component';
import {MyExpensesComponent} from './components/expension/my-expenses/my-expenses.component';
import {ReportsComponent} from './components/reports/reports.component';
import {TimelineComponent} from './components/timeline/timeline.component';
import {SchedulerComponent} from './components/scheduler/scheduler.component';
import {MapComponent} from "./components/map/map.component";
import {MyVehiclesGalleryComponent} from "./components/vehicles/gallery/my-vehicles-gallery.component";

const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WelcomeComponent,
    title: 'Car Service'
  },
  {
    path: '',
    pathMatch: 'full',
    component: SignInComponent,
    title: 'Car Service',
    outlet: 'nonAuthenticated'
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    title: 'Zaloguj się',
    canActivate: [() => !inject(AppGuard).isAuthenticated()],
    outlet: 'nonAuthenticated'
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    title: 'Zarejestruj się',
    canActivate: [() => !inject(AppGuard).isAuthenticated()],
    outlet: 'nonAuthenticated'
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    title: 'Resetuj hasło',
    canActivate: [() => !inject(AppGuard).isAuthenticated()],
    outlet: 'nonAuthenticated'
  },
  {
    path: 'new-password',
    component: NewPasswordComponent,
    title: 'Nowe hasło',
    canActivate: [() => !inject(AppGuard).isAuthenticated()],
    outlet: 'nonAuthenticated'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    title: 'Mój profil',
    canActivate: [() => inject(AppGuard).isAuthenticated()],
    loadChildren: () => import('./components/profile/profile-routing.module').then(module => module.ProfileRoutingModule)
  },
  {
    path: 'my-vehicles',
    component: MyVehiclesComponent,
    title: 'Pojazdy',
    canActivate: [() => inject(AppGuard).isAuthenticated()]
  },
  {
    path: 'my-vehicles-gallery',
    component: MyVehiclesGalleryComponent,
    title: 'Galeria pojazdów',
    canActivate: [() => inject(AppGuard).isAuthenticated()]
  },
  {
    path: 'my-insurances',
    component: MyInsurancesComponent,
    title: 'Ubezpieczenia',
    canActivate: [() => inject(AppGuard).isAuthenticated()]
  },
  {
    path: 'my-inspections',
    component: MyInspectionsComponent,
    title: 'Przeglądy',
    canActivate: [() => inject(AppGuard).isAuthenticated()]
  },
  {
    path: 'my-expenses',
    component: MyExpensesComponent,
    title: 'Wydatki',
    canActivate: [() => inject(AppGuard).isAuthenticated()]
  },
  {
    path: 'reports',
    component: ReportsComponent,
    title: 'Raporty',
    canActivate: [() => inject(AppGuard).isAuthenticated()]
  },
  {
    path: 'timeline',
    component: TimelineComponent,
    title: 'Oś czasu',
    canActivate: [() => inject(AppGuard).isAuthenticated()]
  },
  {
    path: 'scheduler',
    component: SchedulerComponent,
    title: 'Terminarz',
    canActivate: [() => inject(AppGuard).isAuthenticated()]
  },
  {
    path: 'map',
    component: MapComponent,
    title: 'Mapa',
    canActivate: [() => inject(AppGuard).isAuthenticated()]
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Strona nie znaleziona'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
