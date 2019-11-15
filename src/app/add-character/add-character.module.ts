import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DefaultValueAccessor } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    DefaultValueAccessor
  ]
})
export class AddCharacterModule { }
