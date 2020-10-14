import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ɵangular_packages_platform_browser_animations_animations_a } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(usuario: Usuario): Observable<any> {
    const url: string = 'http://localhost:8080/oauth/token';

    const credenciales = btoa('angularpp' + ':' + '12345');

    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + credenciales,
    });

    let params = new URLSearchParams();

    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);

    return this.http.post<any>(url, params, { headers: httpHeaders });
  }
}
