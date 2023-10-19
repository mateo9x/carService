import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from './components/authentication/sign-in/sign-in.component';
import {WelcomeComponent} from './components/welcome/welcome.component';

const ROUTES: Routes = [
  {path: '', component: WelcomeComponent, title: 'Car service'},
  {path: 'sign-in', component: SignInComponent, title: 'Zaloguj się'}
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
