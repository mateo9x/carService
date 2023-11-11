import {Component, OnDestroy, OnInit} from '@angular/core';
import {ThemeService} from '../../../util/services/theme.service';
import {FormGroup} from '@angular/forms';
import {SnackBarService, SnackBarType} from '../../../util/services/snack-bar.service';
import {UserPreferencesService} from '../../../services/user-preferences.service';
import {UserPreferences} from '../../../models/user-preferences.model';
import {PreferencesFormService} from './preferences-form.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit, OnDestroy {
  form: FormGroup;
  themeSaved = true;
  themes = [
    {label: 'Domyślny', value: 'default'},
    {label: 'Zielony', value: 'green'},
    {label: 'Ciemny', value: 'black'},
    {label: 'Żółty', value: 'yellow'}
  ];
  userPreferences: UserPreferences | null = null;
  notifyInsuranceSubscription: Subscription = new Subscription();
  notifyInspectionSubscription: Subscription = new Subscription();

  constructor(private formService: PreferencesFormService,
              private themeService: ThemeService,
              private snackBarService: SnackBarService,
              private userPreferencesService: UserPreferencesService) {
    this.form = this.formService.getFormGroup();
  }

  ngOnInit() {
    this.getUserPreferences();
    this.startNotifyInsuranceSubscription();
    this.startNotifyInspectionSubscription();
  }

  ngOnDestroy() {
    this.notifyInsuranceSubscription.unsubscribe();
    this.notifyInspectionSubscription.unsubscribe();
  }

  getUserPreferences() {
    this.userPreferencesService.getUserPreferencesForUserLogged().subscribe({
      next: (userPreferences) => {
        this.userPreferences = userPreferences;
        if (userPreferences) {
          this.formService.fillForm(this.form, userPreferences);
        }
      }
    })
  }

  startNotifyInsuranceSubscription() {
    this.notifyInsuranceSubscription = this.formService.getNotifyInsuranceControl(this.form).valueChanges.subscribe({
      next: (value) => {
        const daysBeforeInsuranceExpireControl = this.formService.getDaysBeforeInsuranceExpireControl(this.form);
        if (value) {
          daysBeforeInsuranceExpireControl.enable();
        } else {
          daysBeforeInsuranceExpireControl.disable()
          daysBeforeInsuranceExpireControl.setValue(null);
        }
      }
    });
  }

  startNotifyInspectionSubscription() {
    this.notifyInspectionSubscription = this.formService.getNotifyInspectionsControl(this.form).valueChanges.subscribe({
      next: (value) => {
        const mileageBeforeInspectionExpireControl = this.formService.getMileageBeforeInspectionExpireControl(this.form);
        if (value) {
          mileageBeforeInspectionExpireControl.enable();
        } else {
          mileageBeforeInspectionExpireControl.disable()
          mileageBeforeInspectionExpireControl.setValue(null);
        }
      }
    });
  }

  changeTheme() {
    this.themeService.setTheme(this.formService.getSelectedThemeControl(this.form).value, false);
    this.themeSaved = false;
  }

  save() {
    const userPreferences = this.formService.convertFormToUserPreferences(this.form);
    userPreferences.id = this.userPreferences?.id;
    userPreferences.userId = this.userPreferences?.userId;
    this.userPreferencesService.saveUserPreferences(userPreferences).subscribe({
      next: () => {
        this.themeService.setTheme(this.formService.getSelectedThemeControl(this.form).value, true);
        this.themeSaved = true;
        this.snackBarService.openSnackBar('Preferencje zaktualizowane', SnackBarType.SUCCESS);
      },
      error: () => this.snackBarService.openSnackBar('Preferencje nie zostały zaktualizowane', SnackBarType.ERROR)
    });
  }
}
