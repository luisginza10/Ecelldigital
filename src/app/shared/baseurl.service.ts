import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseurlService {
  /*
    cloud 1: https://aviscelldigital.herokuapp.com/
    cloud 2 aws: http://awscelldigitalapp-env.eba-kavzbny8.us-east-2.elasticbeanstalk.com/
    desarrollo:return 'http://localhost:8080/';
  */
  constructor() { }
  getBaseUrl(): string {
    return 'http://awscelldigitalapp-env.eba-kavzbny8.us-east-2.elasticbeanstalk.com/';
  }
}
