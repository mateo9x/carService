import {Component} from '@angular/core';
import {ThemeService} from '../../../services/util/theme.service';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {SnackBarService, SnackBarType} from '../../../services/util/snack-bar.service';

@Component({
  selector: 'preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent {
  form: FormGroup;
  themeSaved = true;
  themes = [
    {label: 'Domyślny', value: 'default'},
    {label: 'Zielony', value: 'green'},
    {label: 'Ciemny', value: 'black'},
    {label: 'Żółty', value: 'yellow'}
  ]

  constructor(private formService: FormBuilder,
              private themeService: ThemeService,
              private snackBarService: SnackBarService) {
    this.form = this.formService.group({
      selectedTheme: [null, []]
    });
  }

  changeTheme() {
    this.themeService.setTheme(this.getSelectedThemeControl().value, false);
    this.themeSaved = false;
  }

  save() {
    this.themeService.setTheme(this.getSelectedThemeControl().value, true);
    this.themeSaved = true;
    this.snackBarService.openSnackBar('Preferencje zaktualizowane', SnackBarType.SUCCESS);
  }

  getSelectedThemeControl() {
    return this.form.get('selectedTheme') as AbstractControl;
  }
}
