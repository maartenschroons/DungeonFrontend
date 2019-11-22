import { Component, OnInit } from '@angular/core';
import { Class } from '../models/class.model';
import { Observable } from 'rxjs';
import { ClassService } from '../services/class.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  classList: Observable<Class[]>;

  constructor(private _classService: ClassService, private router: Router) {
    this.classList = this._classService.getAllClasses();
  }

  ngOnInit() {
  }

  findClassList(name: string) {
    name = name.toLowerCase();

    this.classList = this._classService.getClassByName(name);
  }

  Add(id: number){
    localStorage.setItem("classId", id.toString());
    this.router.navigateByUrl('/add');
  }

}
