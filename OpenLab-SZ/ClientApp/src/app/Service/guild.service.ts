import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuildService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  // http get to get info about certain guild based on id
  getInfoAboutCertainGuild(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);

    return this.http.get<GuildDto>(this.baseUrl + 'guilds/getGuildById', { params: queryParams })
  }

  // http get to get all users in certain guild based on id
  getUsersInCertainGuild(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);

    return this.http.get<UserDto[]>(this.baseUrl + 'userproperties/getUsersInGuild', { params: queryParams })
  }

  // http get to find out if user is in certain guild
  isInCertainGuild(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);

    return this.http.get<boolean>(this.baseUrl + 'userproperties/hasThisGuild', { params: queryParams })
  }
  //http put to join guild
  joinGuild(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);

   return this.http.put<any>(this.baseUrl + 'userproperties/joinGuild', null, { params: queryParams })
  }

  //http put to leave guild
  leaveGuild() {
    this.http.put<any>(this.baseUrl + 'userproperties/leaveGuild', {}).subscribe()
  }

  //http get to get all guilds
  getAllGuilds() {
    return this.http.get<GuildDto[]>(this.baseUrl + 'guilds/getGuilds')
  }


}

interface GuildDto {
  id: number;
  name: string;
  description: string;
  membersCount: number;
  currentMembersCount: number;
}

interface UserDto {
  xp: number;
  userName: string;
  email: string;
  guild: string;
}
