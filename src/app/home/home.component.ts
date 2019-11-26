import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticateServiceService} from '../services/authenticate-service.service';
import {Player} from '../models/player.model';
import {PlayerService} from '../services/player.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  huidigeGebruiker = JSON.parse(localStorage.getItem("player"));
  player:Player;
  constructor(private router: Router,public _authenticateService: AuthenticateServiceService,private _playerService:PlayerService) {
    if (this.huidigeGebruiker != null){

      this.haalPlayerOp();
    }
  }

  ngOnInit() {
  }
loguit(){
  this._authenticateService.logOut();
}
haalPlayerOp(){
  this._playerService.getPlayerById(this.huidigeGebruiker.id).subscribe(result=>{
    this.player=result;
  });
  console.log(this.player)
}

}
