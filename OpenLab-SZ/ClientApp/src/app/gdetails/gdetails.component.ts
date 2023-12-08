import { Component, signal, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuildService, GuildDetailsDto } from '../Service/guild.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-gdetails',
  templateUrl: './gdetails.component.html',
  styleUrls: ['./gdetails.component.css']
})



export class GDetailsComponent {

  guildIdFromRoute: number = 0;

  guildDetail = signal<GuildDetailsDto>(undefined);
  hasGuild = signal<boolean>(false);

  

  //hasGuild: boolean = false;

  constructor(private route: ActivatedRoute, private guildService: GuildService) { }

  ngOnInit() {
    // Get guild Id
    const routeParams = this.route.snapshot.paramMap;
    this.guildIdFromRoute = Number(routeParams.get('guildId'));

    //method to get info about guild on this page
    this.guildService.getInfoAboutCertainGuild(this.guildIdFromRoute).subscribe(result => { this.guildDetail.set(result) }
      , error => console.error(error));

    //method to find out if user is in this guild
    this.guildService.isInCertainGuild(this.guildIdFromRoute).subscribe(result => { this.hasGuild.set(result) }, error =>  console.error(error));
    
  }

  onJoinGuild() {
    // method for joining guild
    this.guildService.joinGuild(this.guildIdFromRoute).subscribe(result => { this.guildDetail.set(result) });
    this.hasGuild.set(true);
  }

  onLeaveGuild() {
    // http request to leave guild
    this.guildService.leaveGuild(this.guildIdFromRoute).subscribe(result => { this.guildDetail.set(result) });
    this.hasGuild.set(false);
  }

}


