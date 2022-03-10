import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RutaUsuarioPerfilComponent} from "../../rutas/ruta-usuario-perfil/ruta-usuario-perfil.component";

@Component({
  selector: 'app-modal-ejemplo',
  templateUrl: './modal-ejemplo.component.html',
  styleUrls: ['./modal-ejemplo.component.scss']
})
export class ModalEjemploComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public dialogRef: MatDialogRef<RutaUsuarioPerfilComponent>,
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  cerrarDialogo() {
    this.dialogRef.close({nombre: 'Mahatma'});
  }

}


