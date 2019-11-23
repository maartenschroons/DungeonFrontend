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

  ngOnInit() {
  }

}
