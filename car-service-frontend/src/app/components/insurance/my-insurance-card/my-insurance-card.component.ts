import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Insurance} from '../../../models/insurance.model';
import {DictionaryService, DictionaryType} from '../../../services/dictionary.service';

@Component({
  selector: 'my-insurance-card',
  templateUrl: './my-insurance-card.component.html',
  styleUrls: ['./my-insurance-card.component.scss']
})
export class MyInsuranceCardComponent {
  @Input()
  insurance: Insurance | null = null;

  @Output()
  deleteInsuranceEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor(private dictionaryService: DictionaryService) {
  }

  getBooleanLabel(value: boolean) {
    if (value) {
      return 'Tak';
    }
    return 'Nie';
  }

  getDictionaryLabel(value: string, dictionaryType: DictionaryType) {
    const dictionary = this.dictionaryService.getDictionary(dictionaryType);
    return dictionary.filter((dic) => dic.value === value).map((dic) => dic.label);
  }

  getDictionaryLabels(values: string[], dictionaryType: DictionaryType) {
    let returnValue = '';
    if (values) {
      const dictionary = this.dictionaryService.getDictionary(dictionaryType);
      values.forEach((value) => returnValue += dictionary.filter((dic) => dic.value === value).map((dic) => dic.label) + ", ")
      if (returnValue.includes(', ', returnValue.length - 2)) {
        returnValue = returnValue.substring(0, returnValue.length - 2);
      }
    }
    return returnValue;
  }

  deleteInsurance(id: string | undefined) {
    this.deleteInsuranceEmitter.emit(id as string);
  }

  protected readonly DictionaryType = DictionaryType;
}
