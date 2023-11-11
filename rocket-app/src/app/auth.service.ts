import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './login/usuario';

import { environment } from './../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // tslint:disable-next-line: quotemark
  apiURL: string = environment.apiURLBase + "/api/usuarios";

  constructor(private http: HttpClient) { }

  salvar(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.apiURL, usuario);
  }
}
