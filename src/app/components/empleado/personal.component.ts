import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../models/empleado';


@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  public empleado:Empleado;

  constructor() {
    this.empleado = new Empleado();
  }

  ngOnInit() {
  }


}
