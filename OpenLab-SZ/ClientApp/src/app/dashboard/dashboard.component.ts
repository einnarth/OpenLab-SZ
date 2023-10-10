import { Component, Inject } from '@angular/core';
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
  public guilds: GuildDto[] = [];
  selectedGuild: string = "Nie si v žiadnej guilde";
  showSelect: boolean = true;

  showPopup = false; // Príznak pre zobrazenie/skrytie vyskakovacieho okna

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<UserDto[]>(baseUrl + 'userproperties').subscribe(result => {
      this.users = result;
      this.xp = result[0].xp;
      this.guild = result[0].guild;
      this.progress = Math.floor(this.xp / this.requiredXp * 100);
    }, error => console.error(error));

    http.get<GuildDto[]>(baseUrl + 'guilds').subscribe(result => {
      this.guilds = result;
      this.name = result[0].name;
    }, error => console.error(error));
  }

  onGuildSelect(guild: string) {
    this.selectedGuild = guild;
    this.showSelect = false;
  }

  // Metóda na zobrazenie vyskakovacieho okna
  showPopupWindow() {
    this.showPopup = true;
  }

  // Metóda na skrytie vyskakovacieho okna
  hidePopupWindow() {
    this.showPopup = false;
  }
}

interface UserDto {
  xp: number;
  guild: string;
}

interface GuildDto {
  id: number;
  name: string;
}
