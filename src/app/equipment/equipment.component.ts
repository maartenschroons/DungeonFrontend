import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipment } from '../models/equipment.model';
import { EquipmentService } from '../services/equipment.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {
  equipmentListByName: Observable<Equipment[]>;

  constructor(private _equipmentService: EquipmentService) { }

  ngOnInit() {
  }

  findEquipmentList(name: string) {
    name = name.toLowerCase();

    this.equipmentListByName = this._equipmentService.getEquipmentByName(name);
  }

  findEquipmentListCat(name: string) {
    name = name.toLowerCase();

    this.equipmentListByName = this._equipmentService.getEquipmentByCat(name);
  }


}
