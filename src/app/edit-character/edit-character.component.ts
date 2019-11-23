import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {EquipmentService} from '../services/equipment.service';
import {ClassService} from '../services/class.service';
import {CharacterService} from '../services/character.service';
import {RaceService} from '../services/race.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-character',
  templateUrl: './edit-character.component.html',
  styleUrls: ['./edit-character.component.css']
})
export class EditCharacterComponent implements OnInit {

  characterid: number;

  constructor(
    private fb: FormBuilder,
    private _equipmentService: EquipmentService,
    private _classService: ClassService,
    private _characterService: CharacterService,
    private _raceService: RaceService,
    private router: Router
  ) {
    this.characterid = parseInt(localStorage.getItem("characterid"));
    localStorage.removeItem("characterid");

    console.log(this.characterid);
  }

  ngOnInit() {
  }

  NaarList(){
    this.router.navigate(['/list'], {replaceUrl: true});
  }

}
