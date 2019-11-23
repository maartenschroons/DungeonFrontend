import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Player} from '../models/player.model';
import {UserLogin} from '../models/user-login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateServiceService {

  isLoggedin: boolean = false;
  constructor(private _httpClient: HttpClient, private router: Router) { }

  authenticate(userLogin: UserLogin): Observable<Player> {
    console.log(userLogin);
    return this._httpClient.post<Player>('http://localhost:8762/auth/', userLogin);


  }
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('player');
    this.isLoggedin = false;
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    if (localStorage.getItem("token") == null) {
      this.isLoggedin = false;
      return this.isLoggedin;
    }
    else {
      this.isLoggedin = true;
      return true;
    }
  }
}
