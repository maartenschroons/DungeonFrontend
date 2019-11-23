import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticateServiceService} from '../services/authenticate-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  huidigeGebruiker = JSON.parse(localStorage.getItem("player"));
  constructor(private router: Router,public _authenticateService: AuthenticateServiceService,) { }

  ngOnInit() {
  }
loguit(){
  this._authenticateService.logOut();
}
}
