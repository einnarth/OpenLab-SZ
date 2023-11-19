import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public baseUrl: string;
  constructor(private http: HttpClient,  @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public leaveGuild(): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'userproperties/leaveGuild', {});
  }
}
