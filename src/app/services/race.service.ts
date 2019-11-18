import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Race } from '../models/race.model';
import { race } from 'q';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(private http: HttpClient) { }

  getRace(raceID: number): Observable<Race>{
    return this.http.get<Race>("" + raceID);
  }

  getRaces(raceID: number): Observable<Race[]>{
    return this.http.get<Race[]>("" + raceID)
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
