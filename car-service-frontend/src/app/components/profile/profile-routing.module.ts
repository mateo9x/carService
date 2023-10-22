import {RouterModule, Routes} from '@angular/router';
import {UpdatePasswordComponent} from './update-password/update-password.component';
import {inject, NgModule} from '@angular/core';
import {AppGuard} from '../../config/app.guard';
import {AboutMeComponent} from './about-me/about-me.component';
import {PreferencesComponent} from './preferences/preferences.component';

const PROFILE_ROUTES: Routes = [
  {
    path: '',
    component: AboutMeComponent,
    canActivate: [() => inject(AppGuard).isAuthenticated()],
    title: 'Dane profilowe'
  },
  {
    path: 'about-me',
    component: AboutMeComponent,
    canActivate: [() => inject(AppGuard).isAuthenticated()],
    title: 'Dane profilowe'
  },
  {
    path: 'update-password',
    component: UpdatePasswordComponent,
    canActivate: [() => inject(AppGuard).isAuthenticated()],
    title: 'Zmiana hasła'
  },
  {
    path: 'preferences',
    component: PreferencesComponent,
    canActivate: [() => inject(AppGuard).isAuthenticated()],
    title: 'Preferencje'
  }
];

@NgModule({
  imports: [RouterModule.forChild(PROFILE_ROUTES)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {

}
