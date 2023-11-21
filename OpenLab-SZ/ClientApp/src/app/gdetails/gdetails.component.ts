import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuildService } from '../Service/guild.service';



@Component({
  selector: 'app-gdetails',
  templateUrl: './gdetails.component.html',
  styleUrls: ['./gdetails.component.css']
})
export class GDetailsComponent {

  guildIdFromRoute: number = 0;

  guildName: string = "";
  guildDescription: string = "";
  guildMemberCount: number = 0;
  guildCurrentMemberCount: number = 0;

  hasGuild: boolean = false;

  public guildUsers: UserDto[] = [];
  constructor(private route: ActivatedRoute, private guildService: GuildService) { }

  ngOnInit() {
    // Get guild Id
    const routeParams = this.route.snapshot.paramMap;
    this.guildIdFromRoute = Number(routeParams.get('guildId'));

    //method to get info about guild on this page
    this.guildService.getInfoAboutCertainGuild(this.guildIdFromRoute).subscribe(result => {
    this.guildName = result.name;
    this.guildDescription = result.description;
    this.guildCurrentMemberCount = result.currentMembersCount;
    this.guildMemberCount = result.membersCount;
    }, error => console.error(error));

    
    

    //method to get list of users in this guild
    this.guildService.getUsersInCertainGuild(this.guildIdFromRoute).subscribe(result => {
      this.guildUsers = result;
    }, error => console.error(error));


    //method to find out if user is in this guild
    this.guildService.isInCertainGuild(this.guildIdFromRoute).subscribe(result => {
      this.hasGuild = result;
    }, error => console.error(error));
    
  }

  onJoinGuild() {
  // method for joining guild
    this.guildService.joinGuild(this.guildIdFromRoute).subscribe(result => {
    });

    location.reload();
  }

  onLeaveGuild() {
    // http request to leave guild
    this.guildService.leaveGuild();

    location.reload();
  }

}

interface UserDto {
  xp: number;
  userName: string;
  guild: string;
}

