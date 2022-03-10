import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {CasaService} from "../../../services/http/casa.service";
import {CasaInterface} from "../../../services/http/interfaces/casa.interface";

@Component({
  selector: 'app-create-casa-route',
  templateUrl: './create-casa-route.component.html',
  styleUrls: ['./create-casa-route.component.scss'],
  providers: [DatePipe],
})
export class CreateCasaRouteComponent implements OnInit {

  constructor(
    private readonly casaService: CasaService,
    private readonly formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  formCasa?: FormGroup;
  today?: any;
  conjuntoID = '';

  ngOnInit(): void {
    // Get ConjuntoID
    const params = this.activatedRoute.params;
    params.subscribe({
      next: (params) => {
        this.conjuntoID = params['conjuntoID'];
        this.setUpForm();
      }
    });
  }

  validationOptions = {
    nombreMinLength: 5,
    nombreMaxLength: 30,
    ubicacionMinLength: 5,
    ubicacionMaxLength: 100,
    areaMin: 100,
    areaMax: 1000,
    precioMin: 10000,
    precioMax: 1000000,
  }

  setUpForm() {
    this.formCasa = this.formBuilder.group({
      nombre: new FormControl({
        value: '',
        disabled: false,
      }, [
        Validators.required,
        Validators.minLength(this.validationOptions.nombreMinLength),
        Validators.maxLength(this.validationOptions.nombreMaxLength),
      ]),
      ubicacion: new FormControl({
        value: '',
        disabled: false,
      }, [
        Validators.required,
        Validators.minLength(this.validationOptions.ubicacionMinLength),
        Validators.maxLength(this.validationOptions.ubicacionMaxLength),
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
      precio: new FormControl({
        value: '',
        disabled: false,
      }, [
        Validators.required,
        Validators.min(this.validationOptions.precioMin),
        Validators.max(this.validationOptions.precioMax),
      ]),
    });
  }

  createCasa() {
    if (this.formCasa) {
      // Get values from Form
      const casa: CasaInterface = {
        nombre: this.formCasa.get('nombre')?.value,
        ubicacion: this.formCasa.get('ubicacion')?.value,
        area: this.formCasa.get('area')?.value,
        fechaApertura: this.formCasa.get('fechaApertura')?.value,
        precio: this.formCasa.get('precio')?.value,
        conjuntoID: this.conjuntoID,
      }
      // Create Conjunto
      this.casaService.createCasa(this.conjuntoID, casa)
        .subscribe({
          next: (data) => {
            alert('Registro creado!');
            const url = ['/conjunto', this.conjuntoID, 'casa'];
            this.router.navigate(url);
          },
          error: (error) => {
            alert(error);
          }
        });
    }
  }

}
