import {Injectable} from '@angular/core';
import {CacheApiService} from "./api/cache-api.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor(private apiService: CacheApiService) {}

  public getCachedDictionary(dictType: string): Observable<any[]> {
    return this.apiService.getCacheDict(dictType);
  }

  public getDictEntry(type: DictionaryType): { label: string, value: any }[] {
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
          {label: 'Automatyczna', value: 'AUTOMATIC'},
          {label: 'Ręczna', value: 'MANUAL'},
          {label: 'Sekwencyjna', value: 'SEQUENCE'}
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
          {label: 'Link4', value: 'LINK4'},
          {label: 'Warta', value: 'WARTA'},
          {label: 'Tui', value: 'TUI'},
          {label: 'Hdi', value: 'HDI'},
        ]
      case DictionaryType.LOAN_PARTS_AMOUNT:
        return [
          {label: 'Jedna', value: 1},
          {label: 'Dwie', value: 2},
          {label: 'Cztery', value: 4}
        ];
      case DictionaryType.VEHICLE_TYPES:
        return [
          {label: 'Samochód', value: 'CAR'},
          {label: 'Motocykl', value: 'BIKE'},
        ]
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
  LOAN_PARTS_AMOUNT,
  VEHICLE_TYPES
}
