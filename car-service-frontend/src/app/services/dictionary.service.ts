import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  public getDictionary(type: DictionaryType): {label: string, value: any}[] {
    switch (type) {
      case DictionaryType.ENGINE_TYPES:
        return [
          {label: 'Benzyna', value: 'GAS'},
          {label: 'Diesel', value: 'DIESEL'},
          {label: 'Hybryda', value: 'HYBRID'},
          {label: 'Elekryczny', value: 'ELECTRIC'},
          {label: 'LPG', value: 'AUTOGAS'}
        ];
      case DictionaryType.TRANSMISSION_TYPES:
        return [
          {label: 'automatyczna', value: 'AUTOMATIC'},
          {label: 'ręczna', value: 'MANUAL'},
          {label: 'sekwencyjna', value: 'SEQUENCE'}
        ];
      case DictionaryType.AC_PROTECTION_TYPES:
        return [
          {label: 'Żywioły', value: 'NATURE'},
          {label: 'Zwierzęta', value: 'ANIMALS'},
          {label: 'Kradzież', value: 'THEFT'}
        ]
      case DictionaryType.INSURANCE_COMPANIES:
        return [
          {label: 'PZU', value: 'PZU'},
          {label: 'Uniqa', value: 'UNIQA'},
          {label: 'Link4', value: 'LINK4'}
        ]
      case DictionaryType.LOAN_PARTS_AMOUNT:
        return [
          {label: 'Jedna', value: 1},
          {label: 'Dwie', value: 2},
          {label: 'Cztery', value: 4}
        ];
      default:
        return [];
    }
  }

}

export enum DictionaryType {
  ENGINE_TYPES,
  TRANSMISSION_TYPES,
  AC_PROTECTION_TYPES,
  INSURANCE_COMPANIES,
  LOAN_PARTS_AMOUNT
}
