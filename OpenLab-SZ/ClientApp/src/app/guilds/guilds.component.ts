import { Component } from '@angular/core';
import { GuildService } from '../Service/guild.service';

@Component({
  selector: 'app-guilds',
  templateUrl: './guilds.component.html',
  styleUrls: ['./guilds.component.css']
})
export class GuildsComponent {

  public guilds: GuildDto[] = [];


  constructor(private guildService: GuildService) {
    this.guildService.getAllGuilds().subscribe(result => {
      this.guilds = result;
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
