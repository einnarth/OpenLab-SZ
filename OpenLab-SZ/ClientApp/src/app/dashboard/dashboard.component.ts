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
  xp: number = 455;
  progress: number = 0;
  level: number = 1
  xpForNextLevel: number = 0;
  xpToNextLevel: number = 0;


  public users: UserDto[] = [];


  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<UserDto[]>(baseUrl + 'userproperties').subscribe(result => {
      this.users = result;
      //this.xp = result[0].xp;
      this.guild = result[0].guild;
      //this.progress = Math.floor(this.xp / this.requiredXp * 100)
      this.calculateLevel()
      this.calculateXpForNextLevel();
    }, error => console.error(error));
  }
  calculateLevel() {
    const baseXP = 100; // Počiatočný počet XP potrebných na úroveň 1
    const levelMultiplier = 1.2; // Množiteľ pre zvyšovanie potrebných XP na každú ďalšiu úroveň

    let requiredXP = baseXP;
    let currentLevel = 1;

    while (this.xp >= requiredXP) {
      currentLevel++;
      requiredXP = Math.floor(baseXP * Math.pow(levelMultiplier, currentLevel - 1));
    }

    this.level = currentLevel;
  }
  calculateXpForNextLevel() {
    const baseXP = 100;
    const levelMultiplier = 1.2;
    this.xpForNextLevel = Math.floor(baseXP * Math.pow(levelMultiplier, this.level));
    this.xpToNextLevel = this.xpForNextLevel - this.xp;
  }

}



interface UserDto {
  xp: number
  guild: string
}
