import { Component, signal, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GuildService, } from '../Service/guild.service';
import { UserService, UserDto } from '../Service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

  @Injectable({
    providedIn: 'root'
  })

export class DashboardComponent {

  guildIdFromRoute: number;

  userDetail = signal<UserDto>(undefined);

  // variables for showing/hidding content
  isForm: boolean = false;
  showPopup = false;

  // update form
  updateForm = this.fb.group({
    username: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
  })

  constructor(private userService: UserService, private guildService: GuildService, private fb: FormBuilder) {
    this.userService.getCurrentUser().subscribe(result => { this.userDetail.set(result) }
      , error => console.error(error));
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
    this.guildService.leaveGuildWithoutId().subscribe(result => { this.userDetail.set(result) }
      , error => console.error(error));
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
