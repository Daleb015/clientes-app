import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
})
export class DetalleComponent implements OnInit {
  cliente: Cliente;
  titulo: string = 'Detalle del cliente';
  private fotoSeleccionada: File;

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('corre el on init')
    this.activatedRoute.paramMap.subscribe((params) => {
      let id: string = params.get('id');
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente) => {
          this.cliente = cliente;
        });
      }
    });
  }

  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada)
  }

  subirFoto(){
    this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id).subscribe(cliente => {
      console.log(cliente);
      this.cliente = cliente;
      swal('La foto se ha subido completamente!', `La foto se ha subido con exito: ${this.cliente.foto}`,'success')
    });
  }
}
