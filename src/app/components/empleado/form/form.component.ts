import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../../models/empleado';
import { FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public empleado:Empleado;

  constructor() {
    this.empleado = new Empleado();
  }

  ngOnInit() {
  }

  nombreFormControl = new FormControl('', [
    Validators.required
  ]);

  apellidoFormControl = new FormControl('', [
    Validators.required
  ]);

  codigoFormControl = new FormControl('', [
    Validators.required
  ]);

  documentoFormControl = new FormControl('', [
    Validators.required
  ]);

  fechaNacimientoFormControl = new FormControl('', [
    Validators.required
  ]);

  direccionFormControl = new FormControl('', [
    Validators.required
  ]);

  telefonoFormControl = new FormControl('', [
    Validators.required
  ]);

  correoFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

}
