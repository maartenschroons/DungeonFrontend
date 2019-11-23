import {Injectable} from '@angular/core';
import {Character} from '../models/character.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CharacterService {

  constructor(private http: HttpClient) {
  }

  public createCharacter(character: Character) {
    console.log('er in');
    return this.http.post<Character>('http://localhost:8010/character/create', character);

  }

  public getAllCharactersByPlayerid(playerid: number){
    return this.http.get<Character[]>('http://localhost:8010/character/playerid?playerid=' + playerid);
  }
}
