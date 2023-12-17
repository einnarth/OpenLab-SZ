import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  // prerobiť na http metódu vracajúcu UserDto objekt
  getCurrentUser(){
    return this.http.get<UserDto>(this.baseUrl + 'userproperties/getCurrent');
  }
}

export interface UserDto {
  xp: number;
  userName: string;
  email: string;
  guild: string;
}
