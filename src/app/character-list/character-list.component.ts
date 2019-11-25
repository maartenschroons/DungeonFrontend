import {Component, OnInit} from '@angular/core';
import {CharacterService} from '../services/character.service';
import {Observable} from 'rxjs';
import {Character} from '../models/character.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  playerid = 1;
  characterList: Observable<Character[]>;

  constructor(private _characterService: CharacterService, private router: Router) {
    this.leesCharacterList();
  }

  private leesCharacterList() {
    this.characterList = this._characterService.getAllCharactersByPlayerid(this.playerid);
    console.log(this.characterList);
  }

  ngOnInit() {
    this.leesCharacterList();
  }

  EditCharacter(characterid: number){
    localStorage.setItem('characterid', characterid.toString());
    this.router.navigate(['/editcharacter'], {replaceUrl: true});
  }


}
