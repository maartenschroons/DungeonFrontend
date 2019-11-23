import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Equipment} from '../models/equipment.model';
import {EquipmentService} from '../services/equipment.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {
  equipmentList: Observable<Equipment[]>
  added = false;;

  constructor(private _equipmentService: EquipmentService, private router: Router) {
    this.equipmentList = this._equipmentService.getAllEquipment();
  }

  ngOnInit() {
  }

  findEquipmentList(name: string) {
    name = name.toLowerCase();
    if (name != '' && name != null) {
      this.equipmentList = this._equipmentService.getEquipmentByName(name);
    } else {
      this.equipmentList = null;
    }
  }

  findEquipmentListCat(name: string) {
    name = name.toLowerCase();
    if (name != '' && name != null) {
      this.equipmentList = this._equipmentService.getEquipmentByCat(name);
    } else {
      this.equipmentList= null;
    }

  }

  Add(id: number, name: string) {
    localStorage.setItem('equipmentId', id.toString());
    localStorage.setItem('equipmentName', name.toString());
    this.findEquipmentList(name);
    this.added = true;
  }

  Change(){
    localStorage.removeItem('equipmentId');
    localStorage.removeItem('equipmentName');
    this.equipmentList = this._equipmentService.getEquipmentByCat('');
    this.added = false;
  }
}
