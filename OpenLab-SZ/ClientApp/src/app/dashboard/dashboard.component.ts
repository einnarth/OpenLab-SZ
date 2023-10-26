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
  nothing: string = "";

  public users: UserDto[] = [];
  public guilds: GuildDto[] = [];
  selectedGuild: string = "Nie si v žiadnej guilde";
  showSelect: boolean = true;

  showPopup = false; // Príznak pre zobrazenie/skrytie vyskakovacieho okna

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string)
  {http.get<UserDto>(baseUrl + 'userproperties').subscribe(result => {
    this.name = result.userName; // Predpokladajme, že máte premennú this.user definovanú na strane komponentu
    this.xp = result.xp;
    this.guild = result.guild;
    if (this.guild == this.nothing) {
      this.guild == "nie si v žiadnej guilde";
    }
    this.progress = Math.floor(this.xp / this.requiredXp * 100);
  }, error => console.error(error));


    http.get<GuildDto[]>(baseUrl + 'guilds').subscribe(result => {
      this.guilds = result;
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
  userName: string;
  guild: string;
}

interface GuildDto {
  id: number;
  name: string;
}
