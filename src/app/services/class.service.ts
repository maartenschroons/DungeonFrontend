import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Class } from '../models/class.model';
import { Lijst } from '../models/lijst.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  classList: Class[] = new Array<Class>();

  constructor(private http: HttpClient) { }

  getAllClasses(): Observable<Class[]> {
    this.http.get<Lijst>("http://dnd5eapi.co/api/classes")
      .subscribe(result => {
        for (let i = 0; i < result.results.length; i++) {
          this.classList[i] = this.getClassById(result.results[i].url);
        }
      });
    return of(this.classList);
  }

  getClassById(url: string): Class {
    const classModel = new Class(0, "", 0);

    this.http.get<Class>(url).subscribe(
      result => {
        classModel.index = result.index;
        classModel.name = result.name;
        classModel.hit_die = result.hit_die;
      });

    return classModel;
  }

  getClassByName(substring: string): Observable<Class[]> {
    const classListByName: Class[] = new Array<Class>();
    this.getAllClasses().pipe(map(result =>
      result.filter(result => result.name.toLowerCase().includes(substring))))
      .subscribe(result => {
      for (let i = 0; i < result.length; i++) {      
          classListByName[i] = result[i];
      }
    });
    return of(classListByName);
  }

}
