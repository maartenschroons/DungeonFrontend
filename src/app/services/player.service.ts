import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Player} from '../models/player.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  public getPlayerById(id: number):Observable<Player>{
    return this.http.get<Player>('http://localhost:8010/player/id?id=' + id);
  }

}
