import {AbstractControl, ValidationErrors} from '@angular/forms';

export function schedulerTimeValidator(timeAbstractControl: AbstractControl): ValidationErrors | null {
    const time = timeAbstractControl.value;
    if (time && time.length === 4) {
      const hours = time.substring(0, 2) as unknown as number;
      const minutes = time.substring(2, time.length) as unknown as number;
      const invalid = hours > 24 || minutes > 59;
      return invalid ? {format: true} : null;
    }
    return null;
}
