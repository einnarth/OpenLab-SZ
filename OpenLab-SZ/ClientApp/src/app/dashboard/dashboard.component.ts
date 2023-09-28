import { Component, Inject, OnInit } from '@angular/core';
import { DataService } from './../../data.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  name: string = "Pavol";
  guild: string = "";
  xp: number = 10;
  requiredXp: number = 120;
  progress: number = 0;


  public users: UserDto[] = [];


  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<UserDto[]>(baseUrl + 'userproperties').subscribe(result => {
      this.users = result;
      this.xp = result[0].xp;
      this.guild = result[0].guild;
      this.progress = Math.floor(this.xp / this.requiredXp * 100)
    }, error => console.error(error));
  }

}



interface UserDto {
  xp: number
  guild: string
}
