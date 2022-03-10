import {Component, Input, OnInit} from '@angular/core';
import {ConjuntoService} from "../../../services/http/conjunto.service";
import {ConjuntoInterface} from "../../../services/http/interfaces/conjunto.interface";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-conjunto-route',
  templateUrl: './update-conjunto-route.component.html',
  styleUrls: ['./update-conjunto-route.component.scss'],
  providers: [DatePipe],
})
export class UpdateConjuntoRouteComponent implements OnInit {

  constructor(
    private readonly conjuntoService: ConjuntoService,
    private readonly formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  formUpdateConjunto?: FormGroup;
  today?: any;
  conjunto?: ConjuntoInterface;
  conjuntoID = '';

  ngOnInit(): void {
    const params = this.activatedRoute.params;
    params.subscribe({
      next: (params) => {
        this.conjuntoID = params['conjuntoID'];
        this.readConjunto();
      }
    });
  }

  readConjunto() {
    this.conjuntoService.readConjuntoByID(this.conjuntoID)
      .subscribe({
        next: (data) => {
          this.conjunto = data;
          this.setUpForm();
          this.score = this.conjunto!.estrellas;
          this.listenChanges();
        }
      });
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
    this.formUpdateConjunto = this.formBuilder.group({
      nombre: new FormControl({
        value: this.conjunto!.nombre,
        disabled: false,
      }, [
        Validators.required,
        Validators.minLength(this.validationOptions.nombreMinLength),
        Validators.maxLength(this.validationOptions.nombreMaxLength),
      ]),
      direccion: new FormControl({
        value: this.conjunto!.direccion,
        disabled: false,
      }, [
        Validators.required,
        Validators.minLength(this.validationOptions.direccionMinLength),
        Validators.maxLength(this.validationOptions.direccionMaxLength),
      ]),
      area: new FormControl({
        value: this.conjunto!.area,
        disabled: false,
      }, [
        Validators.required,
        Validators.min(this.validationOptions.areaMin),
        Validators.max(this.validationOptions.areaMax),
      ]),
      fechaApertura: new FormControl({
        value: this.conjunto!.fechaApertura,
      }, [
        Validators.required,
      ]),
      estrellas: new FormControl({
        value: this.conjunto!.estrellas,
        disabled: false,
      }, [
        Validators.required,
        Validators.min(this.validationOptions.estrellasMin),
        Validators.max(this.validationOptions.estrellasMax),
      ]),
    });
  }

  updateConjunto() {
    if (this.formUpdateConjunto) {
      const conjuntoUpdated: ConjuntoInterface = {
        nombre: this.formUpdateConjunto.get('nombre')?.value,
        direccion: this.formUpdateConjunto.get('direccion')?.value,
        area: this.formUpdateConjunto.get('area')?.value,
        fechaApertura: this.formUpdateConjunto.get('fechaApertura')?.value,
        estrellas: this.formUpdateConjunto.get('estrellas')?.value,
      }
      this.conjuntoService.updateConjuntoByID(this.conjunto!._id as string, conjuntoUpdated)
        .subscribe({
          next: (data) => {
            alert('Se han actualizado los datos!');
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
    const changes = this.formUpdateConjunto?.get('estrellas')?.valueChanges;
    changes!.subscribe({
      next: (newScore) => {
        this.score = newScore;
      }
    });
  }
}
