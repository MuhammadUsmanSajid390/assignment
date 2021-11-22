import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private unsubscribeRequest: Subject<boolean> = new Subject<boolean>();

  constructor(private httpClient: HttpClient) { }

  get<T>(
    relativeUrl: string,
    headerType: string = 'json',
    forceUpdate: boolean = true
  ): Observable<T>{
    if(headerType === 'json'){
      return this.httpClient.get<T>(relativeUrl).pipe(takeUntil(this.unsubscribeRequest));
    }
    else{
      const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
      return this.httpClient
        .get<T>(relativeUrl, {headers, responseType: 'text' as 'json'})
        .pipe(takeUntil(this.unsubscribeRequest))
    }
  }
}
