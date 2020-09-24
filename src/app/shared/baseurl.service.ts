import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseurlService {
  /*
    cloud: https://aviscelldigital.herokuapp.com/
    desarrollo:return 'http://localhost:8080/';
  */
  constructor() { }
  getBaseUrl(): string {
    return 'https://aviscelldigital.herokuapp.com/';
  }
}
