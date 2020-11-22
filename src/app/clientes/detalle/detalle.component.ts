import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';
import { AuthService } from 'src/app/usuarios/auth.service';
import { FacturaService } from 'src/app/facturas/services/factura.service';
import { Factura } from 'src/app/facturas/models/factura';
import { URL_BACKEND } from 'src/app/config/config';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit {
  @Input() cliente: Cliente;
  titulo: string = 'Detalle del cliente';
  fotoSeleccionada: File;
  progreso: number = 0;
  public urlBackend: string =URL_BACKEND;
  constructor(
    private clienteService: ClienteService,
    public modalService: ModalService,
    public authService: AuthService,
    private facturaService: FacturaService
  ) {}

  ngOnInit() {}

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      swal('Error: Debe seleccionar tipo de archivo de imagen', '', 'error');
      this.fotoSeleccionada = null;
    }
  }

  subirFoto() {
    if (!this.fotoSeleccionada) {
      swal('Error Upload: ', 'Debe seleccionar una foto', 'error');
    } else {
      this.clienteService
        .subirFoto(this.fotoSeleccionada, this.cliente.id)
        .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.cliente = response.cliente as Cliente;
            this.modalService.notificarUpload.emit(this.cliente);
            swal(
              'La foto se ha subido completamente!',
              response.mensaje,
              'success'
            );
          }
        });
    }
  }

  delete(factura: Factura): void {
    swal({
      title: 'Esta seguro ?',
      text: `Desea eliminar la factura ${factura.descripcion}`,
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
        this.facturaService.delete(factura.id).subscribe((response) => {
          this.cliente.facturas = this.cliente.facturas.filter(
            (f) => f !== factura
          );

          swal(
            'Factura eliminada!',
            `Factura ${factura.descripcion} eliminada`,
            'success'
          );
        });
      }
    });
  }

  cerrarModal() {
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }
}
