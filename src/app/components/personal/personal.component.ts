import { Component, OnInit } from '@angular/core';
import { Personal } from '../../models/personal';


@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  public personal:Personal;

  constructor() { 
    this.personal = new Personal();
  }

  ngOnInit() {
  }


}
