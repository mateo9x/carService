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

const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WelcomeComponent,
    title: 'Car service'
  },
  {
    path: '',
    pathMatch: 'full',
    component: SignInComponent,
    title: 'Car service',
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
    title: 'Moje pojazdy',
    canActivate: [() => inject(AppGuard).isAuthenticated()]
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Strona nie znaleziona'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
