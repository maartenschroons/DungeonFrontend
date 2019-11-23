import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { Equipment } from '../models/equipment.model';
import { HttpClient } from '@angular/common/http';
import { Lijst } from '../models/lijst.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class EquipmentService {

  equipmentList: Equipment[] = new Array<Equipment>();
  // equipmentListByName: Equipment[] = new Array<Equipment>();

  constructor(private http: HttpClient) { }

  getAllEquipment(): Observable<Equipment[]> {
    this.http.get<Lijst>('http://dnd5eapi.co/api/equipment')
      .subscribe(result => {
        for (let i = 0; i < result.results.length; i++) {
          this.equipmentList[i] = this.getEquipmentByUrl(result.results[i].url);
        }
      });
    return of(this.equipmentList);
  }

  getEquipmentById(id: number): Equipment {
    const equipment = new Equipment(0, "", "", "", "", 0);

    this.http.get<Equipment>('http://www.dnd5eapi.co/api/equipment/'+id).subscribe(
      result => {
        equipment.index = result.index;
        equipment.name = result.name;
        equipment.category_range = result.category_range;
        equipment.weapon_range = result.weapon_range;
        equipment.equipment_category = result.equipment_category;
        equipment.weight = result.weight;
      });

    return equipment;
  }

  getEquipmentByName(substring: string): Observable<Equipment[]> {
    const equipmentListByName: Equipment[] = new Array<Equipment>();
    this.getAllEquipment().pipe(map(equipment =>
      equipment.filter(equipment => equipment.name.toLowerCase().includes(substring))))
      .subscribe(result => {
      for (let i = 0; i < result.length; i++) {
          equipmentListByName[i] = result[i];
      }
    });
    return of(equipmentListByName);
  }

  getEquipmentByCat(substring: string): Observable<Equipment[]> {
    let equipmentListByName: Equipment[] = new Array<Equipment>();
    this.getAllEquipment().pipe(map(equipment =>
      equipment.filter(equipment => equipment.equipment_category.toLowerCase().includes(substring))))
      .subscribe(result => {
      for (let i = 0; i < result.length; i++) {
          equipmentListByName[i] = result[i];
      }
    });
    return of(equipmentListByName);
  }

  getEquipmentByUrl(url: string): Equipment {
    const equipment = new Equipment(0, "", "", "", "", 0);

    this.http.get<Equipment>(url).subscribe(
      result => {
        equipment.index = result.index;
        equipment.name = result.name;
        equipment.category_range = result.category_range;
        equipment.weapon_range = result.weapon_range;
        equipment.equipment_category = result.equipment_category;
        equipment.weight = result.weight;
      });

    return equipment;
  }
}
