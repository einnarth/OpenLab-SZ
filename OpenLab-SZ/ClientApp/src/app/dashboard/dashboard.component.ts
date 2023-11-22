import { Component, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

  @Injectable({
    providedIn: 'root'
  })

export class DashboardComponent {
  http: HttpClient;
  baseUrl: string;

  isForm: boolean = false;

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

  // update form
  updateForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
    password2: ["", Validators.required],
  })

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private fb: FormBuilder)
  {
    this.baseUrl = baseUrl;
    this.http = http;

    http.get<UserDto>(baseUrl + 'userproperties/getCurrent').subscribe(result => {
    this.name = result.userName; // Predpokladajme, že máte premennú this.user definovanú na strane komponentu
    this.xp = result.xp;
    this.guild = result.guild;
    if (this.guild == this.nothing) {
      this.guild == "nie si v žiadnej guilde";
    }
    this.progress = Math.floor(this.xp / this.requiredXp * 100);
  }, error => console.error(error));


    http.get<GuildDto[]>(baseUrl + 'guilds/getGuilds').subscribe(result => {
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

  //Metóda na vystúpenie z guildy
  leaveGuild() {
    this.showPopup = false;
    // http request
    this.http.put<any>(this.baseUrl + 'userproperties/leaveGuild', {})
      .subscribe();
      this.guild = "Haha nemáš guildu"
  }

  openForm() {
    this.isForm = true;
  }

  closeForm() {
    this.isForm = false;
  }

  onSubmit() {
    console.log(this.updateForm.value)
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
