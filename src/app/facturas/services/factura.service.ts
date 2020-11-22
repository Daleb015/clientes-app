import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_BACKEND } from 'src/app/config/config';
import { Factura } from '../models/factura';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private urlEndpoint: string = URL_BACKEND+'/api';


  constructor(private http: HttpClient) { }

  create(factura: Factura): Observable<Factura>{
    return this.http.post<Factura>(`${this.urlEndpoint}/facturas`,factura);
  }

  getFactura(id: string):Observable<Factura>{
    return this.http.get<Factura>(`${this.urlEndpoint}/facturas/${id}`);
  }

  delete(id: string): Observable<void>{
  return this.http.delete<void>(`${this.urlEndpoint}/facturas/${id}`);
  }

  filtrarProductos(term: string): Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.urlEndpoint}/productos/filtrar/nombre/${term}`);
  }

}
