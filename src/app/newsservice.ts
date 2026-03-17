import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Newsservice {
  private apikey='abb923ead96a481ab83dddd4445cf64e';
  private url='https://newsapi.org/v2/';

  constructor(private http:HttpClient){}

  Headlines(query: string = '', country: string = 'us'): Observable<any> {
    let params = new HttpParams()
      .set('apiKey', this.apikey)
      .set('country', country);
    if (query) {
      params = params.set('q', query);
    }
    return this.http.get(this.url+'top-headlines', { params });
  }
  
}
