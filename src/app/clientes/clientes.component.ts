import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import { map, tap } from 'rxjs/Operators';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from './detalle/modal.service';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];
  paginador: any;
  clienteSeleccionado: Cliente;
  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    public modalService: ModalService,
    public authService: AuthService
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
        .subscribe(
          (response) => {
            (this.clientes = response.content as Cliente[]);
            this.paginador = response;
          }
        );
    });

    this.modalService.notificarUpload.subscribe(cliente => {
      this.clientes.map(clienteOriginal => {
        if (cliente.id == clienteOriginal.id) {
          clienteOriginal.foto = cliente.foto
        }
        return clienteOriginal;
      })
    })

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

  abrirModal(cliente: Cliente){
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }

}
