import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {CasaService} from "../../../services/http/casa.service";
import {CasaInterface} from "../../../services/http/interfaces/casa.interface";

@Component({
  selector: 'app-update-casa-route',
  templateUrl: './update-casa-route.component.html',
  styleUrls: ['./update-casa-route.component.scss'],
  providers: [DatePipe]
})
export class UpdateCasaRouteComponent implements OnInit {

  constructor(
    private readonly casaService: CasaService,
    private readonly formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  formUpdateCasa?: FormGroup;
  today?: any;
  casa?: CasaInterface;
  conjuntoID = '';
  casaID = '';

  ngOnInit(): void {
    const params = this.activatedRoute.params;
    params.subscribe({
      next: (params) => {
        this.conjuntoID = params['conjuntoID'];
        this.casaID = params['casaID'];
        this.readCasa();
      }
    });
  }

  readCasa() {
    this.casaService.readCasaByID(this.conjuntoID, this.casaID)
      .subscribe({
        next: (data) => {
          this.casa = data;
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
    this.formUpdateCasa = this.formBuilder.group({
      nombre: new FormControl({
        value: this.casa!.nombre,
        disabled: false,
      }, [
        Validators.required,
        Validators.minLength(this.validationOptions.nombreMinLength),
        Validators.maxLength(this.validationOptions.nombreMaxLength),
      ]),
      ubicacion: new FormControl({
        value: this.casa!.ubicacion,
        disabled: false,
      }, [
        Validators.required,
        Validators.minLength(this.validationOptions.ubicacionMinLength),
        Validators.maxLength(this.validationOptions.ubicacionMaxLength),
      ]),
      area: new FormControl({
        value: this.casa!.area,
        disabled: false,
      }, [
        Validators.required,
        Validators.min(this.validationOptions.areaMin),
        Validators.max(this.validationOptions.areaMax),
      ]),
      fechaApertura: new FormControl({
        value: this.casa!.fechaApertura,
      }, [
        Validators.required,
      ]),
      precio: new FormControl({
        value: this.casa!.precio,
        disabled: false,
      }, [
        Validators.required,
        Validators.min(this.validationOptions.precioMin),
        Validators.max(this.validationOptions.precioMax),
      ]),
    });
  }

  updateCasa() {
    if (this.formUpdateCasa) {
      const casaUpdated: CasaInterface = {
        nombre: this.formUpdateCasa.get('nombre')?.value,
        ubicacion: this.formUpdateCasa.get('ubicacion')?.value,
        area: this.formUpdateCasa.get('area')?.value,
        fechaApertura: this.formUpdateCasa.get('fechaApertura')?.value,
        precio: this.formUpdateCasa.get('precio')?.value,
        conjuntoID: this.conjuntoID,
      }
      this.casaService.updateCasaByID(this.conjuntoID, this.casaID, casaUpdated)
        .subscribe({
          next: (data) => {
            alert('Se han actualizado los datos!');
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
