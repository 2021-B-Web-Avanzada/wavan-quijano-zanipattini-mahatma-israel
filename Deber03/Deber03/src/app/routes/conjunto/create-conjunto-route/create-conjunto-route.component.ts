import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {ConjuntoInterface} from "../../../services/http/interfaces/conjunto.interface";
import {ConjuntoService} from "../../../services/http/conjunto.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-conjunto-route',
  templateUrl: './create-conjunto-route.component.html',
  styleUrls: ['./create-conjunto-route.component.scss'],
  providers: [DatePipe]
})
export class CreateConjuntoRouteComponent implements OnInit {

  constructor(
    private readonly conjuntoService: ConjuntoService,
    private readonly formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private readonly router: Router,
  ) {
    this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  formConjunto?: FormGroup;
  today?: any;

  ngOnInit(): void {
    this.setUpForm();
    this.listenChanges();
  }

  validationOptions = {
    nombreMinLength: 5,
    nombreMaxLength: 30,
    direccionMinLength: 5,
    direccionMaxLength: 100,
    areaMin: 600,
    areaMax: 10000,
    estrellasMin: 1,
    estrellasMax: 5,
  }

  score = this.validationOptions.estrellasMin;

  setUpForm() {
    this.formConjunto = this.formBuilder.group({
      nombre: new FormControl({
        value: '',
        disabled: false,
      }, [
        Validators.required,
        Validators.minLength(this.validationOptions.nombreMinLength),
        Validators.maxLength(this.validationOptions.nombreMaxLength),
      ]),
      direccion: new FormControl({
        value: '',
        disabled: false,
      }, [
        Validators.required,
        Validators.minLength(this.validationOptions.direccionMinLength),
        Validators.maxLength(this.validationOptions.direccionMaxLength),
      ]),
      area: new FormControl({
        value: '',
        disabled: false,
      }, [
        Validators.required,
        Validators.min(this.validationOptions.areaMin),
        Validators.max(this.validationOptions.areaMax),
      ]),
      fechaApertura: new FormControl({
        value: this.today,
      }, [
        Validators.required,
      ]),
      estrellas: new FormControl({
        value: this.score,
        disabled: false,
      }, [
        Validators.required,
        Validators.min(this.validationOptions.estrellasMin),
        Validators.max(this.validationOptions.estrellasMax),
      ]),
    });
  }

  createConjunto() {
    if (this.formConjunto) {
      // Get values from Form
      const conjunto: ConjuntoInterface = {
        nombre: this.formConjunto.get('nombre')?.value,
        direccion: this.formConjunto.get('direccion')?.value,
        area: this.formConjunto.get('area')?.value,
        fechaApertura: this.formConjunto.get('fechaApertura')?.value,
        estrellas: this.formConjunto.get('estrellas')?.value,
      }
      // Create Conjunto
      this.conjuntoService.createConjunto(conjunto)
        .subscribe({
          next: (data) => {
            alert('Registro creado!');
            const url = ['/conjunto'];
            this.router.navigate(url);
          },
          error: (error) => {
            alert(error);
          }
        });
    }
  }

  listenChanges() {
    const changes = this.formConjunto?.get('estrellas')?.valueChanges;
    changes!.subscribe({
      next: (newScore) => {
        this.score = newScore;
      }
    });
  }

}
