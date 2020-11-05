import { Injectable } from '@angular/core';
import { formatDate, DatePipe, registerLocaleData } from '@angular/common';
import { Cliente } from './cliente';
import { Observable } from 'rxjs';
import { of, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest, } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Region } from './region';
import { AuthService } from '../usuarios/auth.service';

@Injectable()
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  /*   addAuthHeader(){
      if (this.authService.token!=null) {
        let token = this.authService.token;
        return this.httpHeaders.append('Authorization','Bearer '+token);
      }else{
        return this.httpHeaders;
      }
    } */

  /*   isNoAuthorized(e): boolean {
      if (e.status == 401) {
  
        if (this.authService.isAuthenticathed()) {
          this.authService.logout();
        }
  
        this.router.navigate(['/login'])
        return true;
      }
  
      if (e.status == 403) {
        swal('Accesso Denegado', `${this.authService.usuario.username} No tiene acceso a esta función`, 'warning')
        this.router.navigate(['/clientes'])
        return true;
      }
  
      return false;
    } */

  getClientes(page: number): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/page/${page}`).pipe(
      map((response: any) => {
        (response.content as Cliente[]).map((cliente) => {
          cliente.nombre = cliente.nombre.toUpperCase();
          //let datePipe = new DatePipe('es');
          //cliente.createAt =  datePipe.transform(cliente.createAt,'EEEE dd, MMMM yyyy')   //formatDate(cliente.createAt,'dd-MM-yyyy','en-US');
          return cliente;
        });
        return response;
      }),
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post(this.urlEndPoint, cliente,)
      .pipe(
        map((response: any) => response.cliente as Cliente),
        catchError((e) => {

          if (e.status == 400) {
            return throwError(e);
          }

          console.error(e.error.mensaje);
          swal(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente)
      .pipe(
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          swal(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  delete(id: string): Observable<Cliente> {
    return this.http
      .delete<Cliente>(`${this.urlEndPoint}/${id}`)
      .pipe(
        catchError((e) => {
          console.error(e.error.mensaje);
          swal(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {

    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    let httpHeaders = new HttpHeaders();
    if (this.authService.token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + this.authService.token);
    }

    const req = new HttpRequest('POST', `${this.urlEndPoint}/uploads`, formData, {
      reportProgress: true,
      headers: httpHeaders
    });

    return this.http.request(req);

  }

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.urlEndPoint}/regiones`);
  }

}
