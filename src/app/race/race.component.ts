import { Component, OnInit } from '@angular/core';
import { RaceService } from '../services/race.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit {

  constructor(private _raceService: RaceService, private router: Router) { }

  raceForm = new FormGroup({
    inputName: new FormControl('', Validators.required),
    inputSpeed: new FormControl('', Validators.required),
    inputAligment: new FormControl('', Validators.required),
    inputSize: new FormControl('', Validators.required),
    inputAbilityBonuses: new FormControl('', Validators.required),

  })

  onSubmit(){
      this._raceService.insertRace(this.raceForm.value);
  }

  ngOnInit() {
  }

}
