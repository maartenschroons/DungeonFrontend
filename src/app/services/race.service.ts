import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Race } from '../models/race.model';
import { race } from 'q';
import {Character} from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(private http: HttpClient) { }

  public getRaceById(id: String) {
    return this.http.get<Character>('http://localhost:8010/race/id?id=' + id);
  }

  getAllRaces(): Observable<Race[]>{
    return this.http.get<Race[]>('http://localhost:8010/race/all');
  }

  insertRace(race: Race){
    return this.http.post<Race>("", race);
  }

  updateRace(race: Race){
    return this.http.put<Race>("" + race.id, race);
  }

  deleteRace(raceID: number){
    return this.http.delete("" + raceID);
  }
}
