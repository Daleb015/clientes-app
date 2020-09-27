import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs/Operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];
  paginador: any;

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');
      if (!page) {
        console.log(`No existe page, se inicializa a 0`)
        page = 0;
      }
      this.clienteService
        .getClientes(page)
        .pipe(
          tap((response) => {
            (response.content as Cliente[]).forEach((cliente) =>
              console.log(cliente.nombre)
            );
          })
        )
        .subscribe(
          (response) => {
            (this.clientes = response.content as Cliente[]);
            this.paginador = response;
          }
        );
    });
  }

  delete(cliente: Cliente): void {
    swal({
      title: 'Esta seguro ?',
      text: `Desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#BE432A',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar',
      cancelButtonText: 'No, cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe((response) => {
          this.clientes = this.clientes.filter((cli) => cli !== cliente);

          swal(
            'Cliente borrado!',
            `Cliente ${cliente.nombre} eliminado`,
            'success'
          );
        });
      }
    });
  }
}
