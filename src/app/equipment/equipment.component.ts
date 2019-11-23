import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipment } from '../models/equipment.model';
import { EquipmentService } from '../services/equipment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {
  equipmentList: Observable<Equipment[]>;

  constructor(private _equipmentService: EquipmentService, private router: Router) {
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

  Add(id: number) {
    localStorage.setItem('equipmentId', id.toString());
    this.router.navigateByUrl('/add');
  }


}
