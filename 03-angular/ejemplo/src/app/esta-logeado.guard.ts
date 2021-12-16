import {Injectable} from "@angular/core";
import {AuthService} from "./servicios/auth/auth.service";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";

@Injectable()
export class EstaLogeadoGuard implements CanActivate{
  // Inyeccion de dependencias
  constructor(
    private readonly  _authService: AuthService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    return this._authService.estaLogeado;
  }
}
