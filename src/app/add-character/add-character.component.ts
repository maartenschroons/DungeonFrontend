import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Character } from '../models/character.model';
import { Race } from '../models/race.model';
import { Equipment } from '../models/equipment.model';
import { Observable } from 'rxjs';
import { EquipmentService } from '../services/equipment.service';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY } from '@angular/cdk/overlay/typings/overlay-directives';
import { ClassService } from '../services/class.service';
import { Class } from '../models/class.model';

@Component({
  selector: 'app-add-character',
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.css']
})
export class AddCharacterComponent implements OnInit {
  characterForm = this.fb.group({
    Name: ['', Validators.required],
    Alignment: ['', Validators.required],
    Strength: ['', Validators.required],
    Dexterity: ['', Validators.required],
    Constitution: ['', Validators.required],
    Wisdom: ['', Validators.required],
    Intelligence: ['', Validators.required],
    Charisma: ['', Validators.required],
    race: [''],
    equipment: [''],
    class: ['']
  });
  classModel: Class = new Class(0, null, null);
  raceModel: Race = new Race('id', null, null, null, null);
  characterModel: Character = new Character(0, null, null, null, null, null, null, null, null, null, null, null, null);
  equipmentModel: Equipment = new Equipment(0, null, null, null, null, 0);
  equipmentList: Observable<Equipment[]>;
  equipment: Equipment = new Equipment(0, null, null, null, null, 0);;
  class: Class = new Class(0,null,0);

  constructor(private fb: FormBuilder, private _equipmentService: EquipmentService, private _classService: ClassService) {
    this.fillVariables();
  }

  fillVariables() {
    if (parseInt(localStorage.getItem('equipmentId')) != null) {
      this.equipment = this._equipmentService.getEquipmentById(parseInt(localStorage.getItem("equipmentId")));
    }
    if (parseInt(localStorage.getItem('classId')) != null) {
      this.class = this._classService.getClassById(parseInt(localStorage.getItem("classId")));
    }

  }
  ngOnInit() {
  }

  onSubmit() {

  }

}
