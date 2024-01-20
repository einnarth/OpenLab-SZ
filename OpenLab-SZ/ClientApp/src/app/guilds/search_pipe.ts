import { Pipe, PipeTransform } from '@angular/core';
import {  GuildDto } from '../Service/guild.service';

@Pipe({
  name: 'filter'
})

export class GuildNameSearch implements PipeTransform {
  transform(guilds: GuildDto[], searchText: string): GuildDto[] {
    if (!guilds || !searchText) {
      return guilds;
    }
    return guilds.filter(guild => guild.name.toLowerCase().includes(searchText.toLowerCase()))
  }

}
