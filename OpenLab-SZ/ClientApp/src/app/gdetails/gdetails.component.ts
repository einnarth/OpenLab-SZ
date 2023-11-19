import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";



@Component({
  selector: 'app-gdetails',
  templateUrl: './gdetails.component.html',
  styleUrls: ['./gdetails.component.css']
})
export class GDetailsComponent {
  http: HttpClient;
  baseUrl: string;

  guildIdFromRoute: number = 0;

  guildName: string = "";
  guildDescription: string = "";
  guildMemberCount: number = 0;
  guildCurrentMemberCount: number = 0;

  public guildUsers: UserDto[] = [];
  constructor(private route: ActivatedRoute, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
    this.http = http;
  }

  ngOnInit() {
    // Get guild Id
    const routeParams = this.route.snapshot.paramMap;
    this.guildIdFromRoute = Number(routeParams.get('guildId'));

    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", this.guildIdFromRoute);

    //http request to get info about guild on this page
    this.http.get<GuildDto>(this.baseUrl + 'guilds/getGuildById', { params: queryParams }).subscribe(result => {
      this.guildName = result.name;
      this.guildDescription = result.description;
      this.guildCurrentMemberCount = result.currentMembersCount;
      this.guildMemberCount = result.membersCount;
    }, error => console.error(error));

    //http request to get list of users in this guild
    this.http.get<UserDto[]>(this.baseUrl + 'userproperties/getUsersInGuild', { params: queryParams }).subscribe(result => {
      this.guildUsers = result;
    }, error => console.error(error));
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
  guild: string;
}

