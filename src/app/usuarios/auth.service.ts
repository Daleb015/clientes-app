import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ɵangular_packages_platform_browser_animations_animations_a } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';
import swal from 'sweetalert2';
import { Usuario } from './usuario';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _usuario: Usuario;
  private _token: string;

  constructor(private http: HttpClient, private router: Router) {}

  public get usuario():Usuario{
    if (this._usuario!=null) {
      return this._usuario
    }else if(sessionStorage.getItem('usuario')!=null) {
      this._usuario =  JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }else{
      return new Usuario();
    }
  }

  public get token():string{
    if (this._token!=null) {
      return this._token;
    }else if (sessionStorage.getItem('token')!=null) {
      this._token = sessionStorage.getItem('token');
      return this._token
    }else{
      return
    }

  }

  login(usuario: Usuario): Observable<any> {
    const url: string = 'http://localhost:8080/oauth/token';

    const credenciales = btoa('angularapp' + ':' + '12345');

    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + credenciales,
    });

    let params = new URLSearchParams();

    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);

    return this.http.post<any>(url, params.toString(), {
      headers: httpHeaders,
    });
  }

  guardarUsuario(token: string) {
    let datosToken = this.obtenerDatosToken(token);
    console.log(datosToken)
    this._usuario = new Usuario();
    this._usuario.nombre = datosToken.nombre_usuario;
    this._usuario.apellido = datosToken.apellido_usuario;
    this._usuario.email = datosToken.email_usuario;
    this._usuario.username = datosToken.user_name;
    this._usuario.roles = datosToken.authorities;
    console.log(JSON.stringify(this._usuario))
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(token: string) {
    this._token = token;
    sessionStorage.setItem('token', this._token);
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split('.')[1]));
    }
    return null;
  }

  isAuthenticathed(): boolean{
    let payload = this.obtenerDatosToken(this.token)

    if (payload!=null&&payload.user_name&&payload.user_name.length>0) {
      return true;
    }

    return false;

  }

  hasRole(role: string):boolean{
    if (this.usuario.roles.includes(role)) {
      return true;
    }
    return false;
  }

  logout(){

    swal('Logout',`${this.usuario.username} has cerrado sesion con exito`,'success');

    this._token = null;
    this._usuario = null;

    sessionStorage.clear();

    this.router.navigate(['/login']);

  }

}
