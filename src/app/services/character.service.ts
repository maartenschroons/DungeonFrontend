import {Injectable} from '@angular/core';
import {Character} from '../models/character.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CharacterService {

  constructor(private http: HttpClient) {
  }

  public createCharacter(character: Character) {
    return this.http.post<Character>('http://localhost:8010/character/create', character);

  }

  public getAllCharactersByPlayerid(playerid: number){
    return this.http.get<Character[]>('http://localhost:8010/character/playerid?playerid=' + playerid);
  }

  public getCharacterById(id: number){
    return this.http.get<Character>('http://localhost:8010/character/id?id=' + id);
  }

  public updateCharacter(character: Character) {
    return this.http.put<Character>('http://localhost:8010/character/update', character);
  }

  public deleteCharacter(id: number) {
    return this.http.delete<Character>('http://localhost:8010/character/delete/?id=' + id);
  }
}
