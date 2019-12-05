import {Component, OnInit} from '@angular/core';
import {Player} from './models/player.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  huidigeGebruiker = JSON.parse(localStorage.getItem("player"));

  constructor() {
    this.huidigeGebruiker = JSON.parse(localStorage.getItem("Gebruiker"));
    console.log(this.huidigeGebruiker)
  }

  alert = false;
  color = "";
  message;
  interval
  timeLeft: number = 7;

   //alert weergeven
   setAlert(message, color){
    this.timeLeft = 7;
    this.alert = true;
    this.message = message;
    this.color = color

    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.alert = false;
        this.message = "";
      }
    },1000)
  }

  ngOnInit() {
  }

}
