import {Component, Input, OnInit} from '@angular/core';
import {ConjuntoInterface} from "../../services/http/interfaces/conjunto.interface";
import {ConjuntoService} from "../../services/http/conjunto.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-conjunto',
  templateUrl: './conjunto.component.html',
  styleUrls: ['./conjunto.component.scss']
})
export class ConjuntoComponent implements OnInit {

  constructor(
    private readonly conjuntoService: ConjuntoService,
    private readonly router: Router,
  ) { }

  @Input() conjunto?: ConjuntoInterface;

  ngOnInit(): void {
  }

  readCasas() {
    const url = ['/conjunto', this.conjunto!._id, 'casa'];
    this.router.navigate(url);
  }

  updateConjunto() {
      const url = ['/conjunto', this.conjunto!._id, 'editarConjunto'];
      this.router.navigate(url);
  }

  deleteConjunto() {
    this.conjuntoService.deleteConjuntoByID(this.conjunto!._id as string)
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
