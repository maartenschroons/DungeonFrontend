import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticateServiceService} from '../services/authenticate-service.service';
import {UserLogin} from '../models/user-login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: UserLogin = new UserLogin( '','');
  submitted = false;
  constructor(public _authenticateService: AuthenticateServiceService, private router: Router) { }

  ngOnInit() {
    if (this._authenticateService.isLoggedIn() == true) {

    }
  }

  onSubmit() {
    this.submitted = true;
    this._authenticateService.authenticate(this.model).subscribe(result => {
      localStorage.setItem("player", JSON.stringify(result));
      localStorage.setItem("token", JSON.stringify(result.token));
      this.router.navigate(['/']);
    });
  }
}
