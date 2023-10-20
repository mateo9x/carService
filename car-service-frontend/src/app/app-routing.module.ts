import {inject, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from './components/authentication/sign-in/sign-in.component';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {SignUpComponent} from './components/authentication/sign-up/sign-up.component';
import {AppGuard} from './config/app.guard';
import {NotFoundComponent} from './components/handlers/not-found/not-found.component';

const ROUTES: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    title: 'Car service'
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    title: 'Zaloguj się',
    canActivate: [() => !inject(AppGuard).isAuthenticated()]
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    title: 'Zarejestruj się',
    canActivate: [() => !inject(AppGuard).isAuthenticated()]
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
