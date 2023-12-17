import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from '../Service/user.service';

@Injectable({
  providedIn: 'root'
})
export class GuildService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  // http get to get info about certain guild based on id
  getInfoAboutCertainGuild(id: number): Observable<GuildDetailsDto> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);

    return this.http.get<GuildDetailsDto>(this.baseUrl + 'guilds/getGuildById', { params: queryParams });
  }

  //http put to join guild
  joinGuild(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);

    return this.http.put<GuildDetailsDto>(this.baseUrl + 'userproperties/joinGuild', null, { params: queryParams })
  }

  //http put to leave guild
  leaveGuild(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);

    return this.http.put<GuildDetailsDto>(this.baseUrl + 'userproperties/leaveGuild', null, { params: queryParams })
  }

  //http put to leave guild without id
  leaveGuildWithoutId() {

    return this.http.put<UserDto>(this.baseUrl + 'userproperties/leaveGuildWithoutId', {})
  }

  //http get to get all guilds
  getAllGuilds() {
    return this.http.get<GuildDto[]>(this.baseUrl + 'guilds/getGuilds')
  }

  CreateGuild(name: string, description: string, membersCount: number) {
    console.log("Názov: " + name + " Popis: " + description + " Maximálny počet členov: " + membersCount);
  }
}

export interface GuildDto {
  id: number;
  name: string;
  description: string;
  membersCount: number;
  currentMembersCount: number;
}

export interface GuildDetailsDto {
  id: number;
  name: string;
  description: string;
  membersCount: number;
  currentMembersCount: number;
  users: UserDto[];
  hasUserAnyGuild: boolean;
  hasUserThisGuild: boolean;
}
