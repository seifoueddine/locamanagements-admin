import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Place {
  imgSrc: string;
  name: string;
  description: string;
  charge: string;
  location: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  places: Array<Place> = [];
  stats: any;
  constructor(private dashboardService: DashboardService, private snackBar: MatSnackBar) {}
  ngOnInit() {
    this.getStats();
    this.places = [
      {
        imgSrc: 'assets/images/card-1.jpg',
        name: 'Cozy 5 Stars Apartment',
        description: `The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio"
              where you can enjoy the main night life in Barcelona.`,
        charge: '$899/night',
        location: 'Barcelona, Spain'
      },
      {
        imgSrc: 'assets/images/card-2.jpg',
        name: 'Office Studio',
        description: `The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio"
              where you can enjoy the night life in London, UK.`,
        charge: '$1,119/night',
        location: 'London, UK'
      },
      {
        imgSrc: 'assets/images/card-3.jpg',
        name: 'Beautiful Castle',
        description: `The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio"
              where you can enjoy the main night life in Milan.`,
        charge: '$459/night',
        location: 'Milan, Italy'
      }
    ];
  }


  getStats = () => {
    this.dashboardService.getStats()
      .subscribe((res: HttpResponse<any>) => {
       
        const resp =  res.body;
        this.stats = resp.stats;
console.log(resp);
console.log(this.stats);


      }, error => {
        this.snackBar.open(error.error.message, 'close', { verticalPosition: 'top',  horizontalPosition: 'right' });
      });
  }



}
