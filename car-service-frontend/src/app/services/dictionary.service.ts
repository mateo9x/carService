import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  public getDictionary(type: DictionaryType) {
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
          {label: 'Skrzynia automatyczna', value: 'AUTOMATIC'},
          {label: 'Skrzynia ręczna', value: 'MANUAL'}
        ];
      default:
        return [];
    }
  }

}

export enum DictionaryType {
  ENGINE_TYPES,
  TRANSMISSION_TYPES
}
