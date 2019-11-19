import { Component, OnInit } from '@angular/core';
import { Class } from '../models/class.model';
import { Observable } from 'rxjs';
import { ClassService } from '../services/class.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  classList: Observable<Class[]>;

  constructor(private _classService: ClassService) { 
    this.classList = this._classService.getAllClasses();
  }

  ngOnInit() {
  }

  findClassList(name: string) {
    name = name.toLowerCase();

    this.classList = this._classService.getClassByName(name);
  }

}
