import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { flatMap, map, startWith } from 'rxjs/operators';
import swal from 'sweetalert2';
import { ClienteService } from '../clientes/cliente.service';
import { Factura } from './models/factura';
import { ItemFactura } from './models/item-factura';
import { Producto } from './models/producto';
import { FacturaService } from './services/factura.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
})
export class FacturasComponent implements OnInit {
  titulo: string = 'nueva factura';
  factura: Factura = new Factura();

  autoCompleteControl = new FormControl();
  productos: string[] = ['Mesa', 'Tablet', 'Computador', 'Portatil'];
  productosFiltrados: Observable<Producto[]>;

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private facturaService: FacturaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let clienteId = params.get('clienteId');
      this.clienteService
        .getCliente(clienteId)
        .subscribe((cliente) => (this.factura.cliente = cliente));
    });
    this.productosFiltrados = this.autoCompleteControl.valueChanges.pipe(
      map((value) => (typeof value === 'string' ? value : value.nombre)),
      flatMap((value) => (value ? this._filter(value) : []))
    );
  }

  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();

    return this.facturaService.filtrarProductos(value);
  }

  mostrarNombre(producto?: Producto): string | undefined {
    return producto ? producto.nombre : undefined;
  }

  seleccionarProducto(event: MatAutocompleteSelectedEvent): void {
    let producto = event.option.value as Producto;
    if (this.existeItem(producto.id)) {
      this.incrementaCantidad(producto.id);
    } else {
      let nuevoItem = new ItemFactura();
      nuevoItem.producto = producto;
      this.factura.items.push(nuevoItem);
    }

    this.autoCompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  actualizarCantidad(id: string, event: any): void {
    let cantidad: number = event.target.value as number;
    if (cantidad == 0) {
      return this.eliminarItemFactura(id);
    }

    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if (id === item.producto.id) {
        item.cantidad = cantidad;
      }
      return item;
    });
  }

  existeItem(id: string): boolean {
    let existe = false;

    this.factura.items.forEach((item: ItemFactura) => {
      if (id === item.producto.id) {
        existe = true;
      }
    });

    return existe;
  }

  incrementaCantidad(id: string): void {
    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if (id === item.producto.id) {
        ++item.cantidad;
      }
      return item;
    });
  }

  eliminarItemFactura(id: string) {
    this.factura.items = this.factura.items.filter((item: ItemFactura) => {
      id !== item.producto.id;
    });
  }

  create():void{
    console.log(this.factura)
    this.facturaService.create(this.factura).subscribe(factura => {
      swal(this.titulo, `Factura ${factura.descripcion} creada con exito`,'success');
      this.router.navigate(['/clientes']);
    },);
  }
}
