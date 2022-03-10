import {Component, Input, OnInit} from '@angular/core';
import {CasaInterface} from "../../services/http/interfaces/casa.interface";
import {Router} from "@angular/router";
import {CasaService} from "../../services/http/casa.service";

@Component({
  selector: 'app-casa',
  templateUrl: './casa.component.html',
  styleUrls: ['./casa.component.scss']
})
export class CasaComponent implements OnInit {

  constructor(
    private readonly casaService: CasaService,
    private readonly router: Router,
  ) { }

  @Input() casa?: CasaInterface;

  ngOnInit(): void {
  }

  updateCasa() {
    const url = ['/conjunto', this.casa!.conjuntoID, 'casa', this.casa!._id, 'editarCasa'];
    this.router.navigate(url);
  }

  deleteCasa() {
    this.casaService.deleteCasaByID(this.casa!.conjuntoID as string, this.casa!._id as string)
      .subscribe({
        next: (data) => {
          alert('Registro eliminado!');
          window.location.reload();
        },
        error: (error) => {
          alert(error);
        }
      });
  }

}
