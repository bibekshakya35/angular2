import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nearby-portfolio',
  templateUrl: './plaes-portfolio.component.html',
  styleUrls: ['./plaes-portfolio.component.css']
})
export class PlaesPortfolioComponent implements OnInit {
  place: any;
  mainImage: any;
  placePortFolio: any;
  constructor() {

    this.place = JSON.parse(localStorage.getItem("nearbyPlace"));
    this.mainImage = this.place.galleries[0];
    console.log(JSON.stringify(this.place));
  }

  ngOnInit() {
  }

}
