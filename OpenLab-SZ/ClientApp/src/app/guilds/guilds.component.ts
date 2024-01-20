import { Component } from '@angular/core';
import { GuildService, GuildDto } from '../Service/guild.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-guilds',
  templateUrl: './guilds.component.html',
  styleUrls: ['./guilds.component.css']
})
export class GuildsComponent {

  public guilds: GuildDto[] = [];
  public guildForm: FormGroup;
  public isFormVisible = false;
  search: string = "";

  constructor(private guildService: GuildService, private formBuilder: FormBuilder) {
    this.guildService.getAllGuilds().subscribe(result => {
      this.guilds = result;
    }, error => console.error(error));

    this.guildForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      membersCount: ['', [Validators.required, Validators.min(1)]],
    });

  }
  toggleFormVisibility() {
    const formContainer = document.getElementById('guildFormContainer');
    formContainer.style.display = (formContainer.style.display === 'none') ? 'block' : 'none';
  }

  onCreateGuild() {
    this.guildService.CreateGuild(this.guildForm.value.name, this.guildForm.value.description, this.guildForm.value.membersCount)
  }
}
