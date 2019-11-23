import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {Character} from '../models/character.model';
import {Race} from '../models/race.model';
import {Equipment} from '../models/equipment.model';
import {Observable} from 'rxjs';
import {EquipmentService} from '../services/equipment.service';
import {CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY} from '@angular/cdk/overlay/typings/overlay-directives';
import {ClassService} from '../services/class.service';
import {Class} from '../models/class.model';
import {RaceService} from '../services/race.service';
import {CharacterService} from '../services/character.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-character',
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.css']
})
export class AddCharacterComponent implements OnInit {

  character: Character = new Character(0, null, null, null, null, null, null, null, null, null, null, null, null);

  raceArray: Observable<Race[]>;
  classArray: Observable<Class[]>;
  alignmentArray: string[];

  submitted = false;

  characterForm: FormGroup;

  availablePoints = 28;
  strPunten = 8;
  dexPunten = 8;
  conPunten = 8;
  intPunten = 8;
  wisPunten = 8;
  chaPunten = 8;



  equipment: Equipment = new Equipment(0, null, null, null, null, 0);
  class: Class = new Class(0, null, 0);

  constructor(
    private fb: FormBuilder,
    private _equipmentService: EquipmentService,
    private _classService: ClassService,
    private _characterService: CharacterService,
    private _raceService: RaceService,
    private router: Router
  ) {
    this.fillVariables();
  }

  ngOnInit() {
    this.characterForm = this.fb.group({
      inputName: ['', Validators.required],
      selectClass: ['', Validators.required],
      selectRace: ['', Validators.required],
      selectAlignment: ['', Validators.required],
    }, {});
  }

  fillVariables() {
    if (parseInt(localStorage.getItem('equipmentId')) != null) {
      this.equipment = this._equipmentService.getEquipmentById(parseInt(localStorage.getItem('equipmentId')));
    }
    if (parseInt(localStorage.getItem('classId')) != null) {
      this.class = this._classService.getClassById(parseInt(localStorage.getItem('classId')));
    }

    // classArray opvullen
    this.classArray = this._classService.getAllClasses();

    // raceArray opvullen
    this.raceArray = this._raceService.getAllRaces();

    // alignmentArray opvullen
    this.alignmentArray = ['True neutral', 'Chaotic neutral', 'lawful neutral',
      'Neutral good', 'Chaotic good', 'lawful good',
      'Neutral evil', 'Chaotic evil', 'lawful evil'
    ];


  }

  get f() {
    return this.characterForm.controls;
  }

  StrDown() {
    if (this.strPunten > 8 ) {
      this.strPunten -= 1;
      this.availablePoints += 1;
      console.log(this.strPunten);
    }
  }

  StrUp() {
    if (this.strPunten < 16 && this.availablePoints > 0) {
      this.strPunten += 1;
      this.availablePoints -= 1;
      console.log(this.strPunten);
    }
  }

  DexDown() {
    if (this.dexPunten > 8) {
      this.dexPunten -= 1;
      this.availablePoints += 1;
      console.log(this.dexPunten);
    }
  }

  DexUp() {
    if (this.dexPunten < 16 && this.availablePoints > 0) {
      this.dexPunten += 1;
      this.availablePoints -= 1;
      console.log(this.dexPunten);
    }
  }

  ConDown() {
    if (this.conPunten > 8) {
      this.conPunten -= 1;
      this.availablePoints += 1;
      console.log(this.conPunten);
    }
  }

  ConUp() {
    if (this.conPunten < 16 && this.availablePoints > 0) {
      this.conPunten += 1;
      this.availablePoints -= 1;
      console.log(this.conPunten);
    }
  }

  IntDown() {
    if (this.intPunten > 8) {
      this.intPunten -= 1;
      this.availablePoints += 1;
      console.log(this.intPunten);
    }
  }

  IntUp() {
    if (this.intPunten < 16 && this.availablePoints > 0) {
      this.intPunten += 1;
      this.availablePoints -= 1;
      console.log(this.intPunten);
    }
  }

  WisDown() {
    if (this.wisPunten > 8) {
      this.wisPunten -= 1;
      this.availablePoints += 1;
      console.log(this.wisPunten);
    }
  }

  WisUp() {
    if (this.wisPunten < 16 && this.availablePoints > 0) {
      this.wisPunten += 1;
      this.availablePoints -= 1;
      console.log(this.wisPunten);
    }
  }

  ChaDown() {
    if (this.chaPunten > 8) {
      this.chaPunten -= 1;
      this.availablePoints += 1;
      console.log(this.chaPunten);
    }
  }

  ChaUp() {
    if (this.chaPunten < 16 && this.availablePoints > 0) {
      this.chaPunten += 1;
      this.availablePoints -= 1;
      console.log(this.chaPunten);
    }
  }

  onSubmit() {
    // validerenvan het form
    this.submitted = true;

    if (this.characterForm.invalid || this.availablePoints > 0) {
      return;
    }

    // indien valide, character opvullen
    this.character.classid = this.characterForm.get(['selectClass']).value;
    this.character.raceid = this.characterForm.get(['selectRace']).value;
    this.character.name = this.characterForm.get(['inputName']).value;
    this.character.alignment = this.characterForm.get(['selectAlignment']).value;
    this.character.strength = this.strPunten;
    this.character.dexterity = this.dexPunten;
    this.character.constitution = this.conPunten;
    this.character.intelligence = this.intPunten;
    this.character.wisdom = this.wisPunten;
    this.character.charisma = this.chaPunten;

    // playerID van lockal storage halen??
    if (parseInt(localStorage.getItem('equipmentId')) != null) {
      this.character.playerid = parseInt(localStorage.getItem('playerid'));
    }

    this.character.playerid = 1;

    // equipmentID van lockal storage halen??
    if (parseInt(localStorage.getItem('equipmentId')) != null) {
      this.character.equipmentid = parseInt(localStorage.getItem('equipmentId'));
    }

    console.log(this.character);

    this._characterService.createCharacter(this.character).subscribe(r => {
      console.log(r);
    });
    this.router.navigate(['/list'], {replaceUrl: true});
  }
}
