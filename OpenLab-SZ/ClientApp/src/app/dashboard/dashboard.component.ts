import { Component, OnInit } from '@angular/core';
import { DataService } from './../../data.service';


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


  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    // Call the fetchData method to retrieve data
    this.dataService.fetchData().subscribe(data => {
      // Handle the data here
      console.log(data);
    });
  }

}
