import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

// client side service to connect to server via http request and form value is passed as parameter

@Injectable({ providedIn: 'root'})
export class SearchService {
  constructor(private http: HttpClient) {}

  getItunes(value){
    const uri = 'http://localhost:3000/api/result';
    const httpParams = new HttpParams().set('value',value);
    return this
            .http
            .get(uri, {
              params: httpParams
          }).pipe(map(res => {
              console.log(res);
              return res;
            }));
  }
}
