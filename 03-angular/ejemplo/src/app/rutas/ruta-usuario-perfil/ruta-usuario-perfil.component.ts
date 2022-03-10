import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserJphService} from "../../servicios/http/user-jph.service";
import {UserJphInterface} from "../../servicios/http/interface/user-jph.interface";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ModalEjemploComponent} from "../../componentes/modal-ejemplo/modal-ejemplo.component";

@Component({
  selector: 'app-ruta-usuario-perfil',
  templateUrl: './ruta-usuario-perfil.component.html',
  styleUrls: ['./ruta-usuario-perfil.component.scss']
})
export class RutaUsuarioPerfilComponent implements OnInit {

  idUsuario = 0;
  usuarioActual?: UserJphInterface;
  formGroup?: FormGroup;
  valorKnob = 30;
  items = [
    { label: 'Update', icon: 'pi pi-refresh', command: () => {console.log('Hola')} },
    { label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup'] }
  ];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly userJPHService: UserJphService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    // Observable
    const parametroRuta$ = this.activatedRoute.params
    parametroRuta$
      .subscribe({
        next: (parametrosRuta) => {
          console.log(parametrosRuta);
          this.idUsuario = + parametrosRuta['idUsuario'];
          this.buscarUsuario(this.idUsuario);
        }
      });
  }

  buscarUsuario(id: number) {
    const buscarUsuarioPorId$ = this.userJPHService.buscarUno(id);
    buscarUsuarioPorId$.subscribe({
      next: (data) => {
        this.usuarioActual = data;
        this.prepararFormulario();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  prepararFormulario() {
    this.formGroup = this.formBuilder.group({
      email: new FormControl({
        value: this.usuarioActual? this.usuarioActual.email : '',
        disabled: false
      }, [
        Validators.required,
        Validators.minLength(3),
      ]),
      esAdministrador: new FormControl(true)
    });
    // Escuchar cambios
    // const cambio$ = this.formGroup.valueChanges;
    // cambio$.subscribe({
    //   next: (valor) => {
    //     if (this.formGroup) {
    //       console.log(valor, this.formGroup);
    //       if (this.formGroup?.valid)
    //         console.log('Ok')
    //       else
    //         console.log('No valid')
    //     }
    //   }
    // });
  }

  prepararObjeto() {
    if (this.formGroup) {
      const email = this.formGroup.get('email');
      if (email) {
        return { email: email.value }
      }
    }
    return { email: '', }
  }

  actualizarUsuario() {
    if (this.usuarioActual) {
      const valoresAActualizar = this.prepararObjeto();
      const actualizar$ = this.userJPHService
        .actualizarPorId(
          this.usuarioActual.id,
          valoresAActualizar
        );
      actualizar$
        .subscribe({
          next: (datos) => {
            console.log(datos);
            const url = ['/app', 'usuario'];
            this.router.navigate(url);  // Volver a la lista de usuarios
          },
          error: (error) => {
            console.error(error);
          }
        })
    }
  }

  guardar() {
    console.log('GUARDAR');
  }

  abrirDialogo() {
    const referenciaDialogo = this.dialog.open(
      ModalEjemploComponent,
      {
        disableClose: true,
        data: {
          animal: 'panda'
        }
      }
    );
    const despuesCerrado$ = referenciaDialogo.afterClosed();
    despuesCerrado$
      .subscribe(
        (datos) => {
          console.log(datos);
        }
      );
  }
}





