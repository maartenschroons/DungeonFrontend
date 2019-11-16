import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Class } from '../models/class.model';
import { Lijst } from '../models/lijst.model';

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
      })
    return of(this.classList);
  }

  getClassById(url: string): Class {
    let clas = new Class(0, "", 0);
    // this.http.get<Equipment>(url).subscribe(result => {console.log(result)});
    this.http.get<Class>(url).subscribe(
      result => {
        clas.index = result.index;
        clas.name = result.name;
        clas.hit_die = result.hit_die;
      });

    return clas;
  }
}
