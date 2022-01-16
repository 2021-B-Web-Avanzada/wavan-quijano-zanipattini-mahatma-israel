import {Injectable} from "@angular/core";
import {AuthService} from "./servicios/auth/auth.service";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {analyticsPackageSafelist} from "@angular/cli/models/analytics";

@Injectable()
export class EsAdministradorGuard {
  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
  ) {
  }


  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable <boolean | UrlTree> | Promise<boolean| UrlTree> | boolean {
    const esAdministrador = this._authService.roles.some((permiso) => permiso === 'admin');
    if (!esAdministrador) {
      this._router.navigate(['/forbidden'])
    }
    return esAdministrador;
  }
}
