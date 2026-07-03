import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Newsservice {
  private apikey = environment.apiKey;
  private url = environment.apiUrl;

  constructor(private http:HttpClient){}

  Headlines(query: string = '', country: string = 'us', category: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('apiKey', this.apikey);
    if (country) {
      params = params.set('country', country);
    }
    if (category) {
      params = params.set('category', category);
    }
    if (query) {
      params = params.set('q', query);
    }
    return this.http.get(this.url+'top-headlines', { params });
  }
  
}
