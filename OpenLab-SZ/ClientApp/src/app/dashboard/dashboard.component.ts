import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  name: string = "Pavol";
  xp: number = 100;
  requiredXp: number = 120;
  progress: number = Math.floor(this.xp / this.requiredXp * 100);

}
