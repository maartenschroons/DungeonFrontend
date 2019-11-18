import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/login.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { AddCharacterComponent } from './add-character/add-character.component';
import { UserListComponent } from './user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { EquipmentComponent } from './equipment/equipment.component';
import { ClassComponent } from './class/class.component';



const appRoutes: Routes = ([
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'list', component: CharacterListComponent },
  { path: 'add', component: AddCharacterComponent },
  { path: 'user', component: UserListComponent },
  { path: 'equipment', component: EquipmentComponent },
  { path: 'class', component: ClassComponent }
]);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CharacterListComponent,
    AddCharacterComponent,
    UserListComponent,
    EquipmentComponent,
    ClassComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
