import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EquipmentService} from '../services/equipment.service';
import {ClassService} from '../services/class.service';
import {CharacterService} from '../services/character.service';
import {RaceService} from '../services/race.service';
import {Router} from '@angular/router';
import {falseIfMissing} from 'protractor/built/util';
import {Character} from '../models/character.model';
import {Race} from '../models/race.model';
import {Class} from '../models/class.model';
import {Equipment} from '../models/equipment.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-edit-character',
  templateUrl: './edit-character.component.html',
  styleUrls: ['./edit-character.component.css']
})
export class EditCharacterComponent implements OnInit {

  characterid: number;
  edit = false;
  character: Character = new Character(0, null, null, null, null, null, null, null, null, null, null, null, null);
  race = new Race('', null, null, null, null);
  class = new Class(null, null, null);
  equipment = new Equipment(null, null, null, null, null, null);

  raceArray: Observable<Race[]>;
  classArray: Observable<Class[]>;
  alignmentArray: string[];

  submitted = false;

  nameEdit = false;
  classEdit = false;
  raceEdit = false;
  alignmentEdit = false;
  equipmentEdit = false;

  characterForm: FormGroup;

  availablePoints = 0;
  strPunten: number;
  dexPunten: number;
  conPunten: number;
  intPunten: number;
  wisPunten: number;
  chaPunten: number;

  constructor(
    private fb: FormBuilder,
    private _equipmentService: EquipmentService,
    private _classService: ClassService,
    private _characterService: CharacterService,
    private _raceService: RaceService,
    private router: Router
  ) {
    this.characterid = parseInt(localStorage.getItem('characterid'));
    localStorage.removeItem('characterid');
    this._characterService.getCharacterById(this.characterid).subscribe(r => {
      this.character.name = r.name;
      this.character.id = r.id;
      this.character.playerid = r.playerid;
      this.character.equipmentid = r.equipmentid;
      this.character.alignment = r.alignment;
      this.character.classid = r.classid;
      this.character.raceid = r.raceid;
      this.character.charisma = r.charisma;
      this.character.wisdom = r.wisdom;
      this.character.intelligence = r.intelligence;
      this.character.strength = r.strength;
      this.character.constitution = r.constitution;
      this.character.dexterity = r.dexterity;
      console.log(this.character);

      this.strPunten = this.character.strength;
      this.dexPunten = this.character.dexterity;
      this.conPunten = this.character.constitution;
      this.intPunten = this.character.intelligence;
      this.wisPunten = this.character.wisdom;
      this.chaPunten = this.character.charisma;

      this._raceService.getRaceById(r.raceid).subscribe(result => {
        this.race.name = result.name;
        this.race.id = result.id.toString();
        this.race.abilityBonuses = result.abilityBonuses;
        this.race.size = result.size;
        this.race.speed = result.speed;
      });

      this.class = this._classService.getClassById(r.classid);
      this.equipment = this._equipmentService.getEquipmentById(r.equipmentid);

    });

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

  ngOnInit() {
    this.characterForm = this.fb.group({
      inputName: ['', Validators.required],
      selectClass: ['', Validators.required],
      selectRace: ['', Validators.required],
      selectAlignment: ['', Validators.required],
    }, {});
  }

  NaarList() {
    this.router.navigate(['/list'], {replaceUrl: true});
  }

  EditOrCancel() {
    this.edit = !this.edit;
  }

  ClickChangeName() {
    this.nameEdit = true;
  }

  ClickChangeClass() {
    this.classEdit = true;
  }

  ClickChangeRace() {
    this.raceEdit = true;
  }

  ClickChangeAlignment() {
    this.alignmentEdit = true;
  }

  ClickChangeEquipment() {
    this.equipmentEdit = true;
  }

  changeName() {
    this.character.name = this.characterForm.get(['inputName']).value;
    console.log(this.character.name);
  }

  changeClass() {
    this.character.classid = this.characterForm.get(['selectClass']).value;
    console.log(this.character.classid);
  }

  changeRace() {
    this.character.raceid = this.characterForm.get(['selectRace']).value;
    console.log(this.character.raceid);
  }

  changeAlignment() {
    this.character.alignment = this.characterForm.get(['selectAlignment']).value;
    console.log(this.character.alignment);
  }

  DeleteChar(id: number) {
    this._characterService.deleteCharacter(id).subscribe(r => {
      console.log('in submit3');
      this.router.navigate(['/list'], {replaceUrl: true});
    });
  }

  onSubmit() {
    // validerenvan het form
    this.submitted = true;

    console.log('in submit');
    if (this.character.name == '' || this.availablePoints > 0) {
      return;
    }

    console.log('in submit2');
    // indien valide, character opvullen
    if (this.classEdit) {
      this.character.classid = this.characterForm.get(['selectClass']).value;
    }
    if (this.raceEdit) {
      this.character.raceid = this.characterForm.get(['selectRace']).value;
    }
    if (this.nameEdit) {
      this.character.name = this.characterForm.get(['inputName']).value;
    }
    if (this.alignmentEdit) {
      this.character.alignment = this.characterForm.get(['selectAlignment']).value;
    }
    this.character.strength = this.strPunten;
    this.character.dexterity = this.dexPunten;
    this.character.constitution = this.conPunten;
    this.character.intelligence = this.intPunten;
    this.character.wisdom = this.wisPunten;
    this.character.charisma = this.chaPunten;

    // equipmentID van lockal storage halen
    if (parseInt(localStorage.getItem('equipmentId')) != null) {
      this.character.equipmentid = parseInt(localStorage.getItem('equipmentId'));
    }


    console.log(this.character);
    localStorage.setItem('characterid', this.character.id.toString());

    this._characterService.updateCharacter(this.character).subscribe(r => {
      console.log('in submit3');
      this.router.navigate(['/list'], {replaceUrl: true});
    });

      // this.router.navigate(['/editcharacter'], {replaceUrl: true});



  }

  get f() {
    return this.characterForm.controls;
  }

  StrDown() {
    if (this.strPunten > 8) {
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


}
