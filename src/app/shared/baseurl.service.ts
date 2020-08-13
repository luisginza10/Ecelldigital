import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseurlService {
  /*
    urlserver: return 'http://192.168.0.12:8080/avisbeer/';
    desarrollo:return 'http://localhost:8080/';
  */
  constructor() { }
  getBaseUrl(): string {
    return 'http://192.168.0.12:8080/';
  }
}
