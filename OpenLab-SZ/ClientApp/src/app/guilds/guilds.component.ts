import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-guilds',
  templateUrl: './guilds.component.html',
  styleUrls: ['./guilds.component.css']
})
export class GuildsComponent {

  public guilds: GuildDto[] = [];


  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<GuildDto[]>(baseUrl + 'guilds/getGuilds').subscribe(result => {
      this.guilds = result;
    }, error => console.error(error));
  }

}

interface GuildDto {
  id: number;
  name: string;
  description: string;
  membersCount: number;
}
