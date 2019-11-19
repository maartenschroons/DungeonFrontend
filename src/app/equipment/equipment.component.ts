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
  equipmentList: Observable<Equipment[]>;

  constructor(private _equipmentService: EquipmentService) { 
    this.equipmentList = this._equipmentService.getAllEquipment();
  }

  ngOnInit() {
  }

  findEquipmentList(name: string) {
    name = name.toLowerCase();

    this.equipmentList = this._equipmentService.getEquipmentByName(name);
  }

  findEquipmentListCat(name: string) {
    name = name.toLowerCase();

    this.equipmentList = this._equipmentService.getEquipmentByCat(name);
  }


}
