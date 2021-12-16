import {Injectable} from "@angular/core";

@Injectable()
export class AuthService{
  estaLogeado = true;

  roles = [
    "admin",
    "supervisor",
    "usuario"
  ];
}
