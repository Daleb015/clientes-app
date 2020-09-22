import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router,ActivatedRoute } from '@angular/router';
import  swal  from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public titulo: string = 'Crear Cliente';
  public cliente: Cliente = new Cliente()
  public errores: string[];

  constructor(private clienteService: ClienteService,
     private router: Router,
     private activatedRoute: ActivatedRoute) { }



  ngOnInit(): void {
    this.cargarCliente()
  }

  cargarCliente(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente)
      }
    })
  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        swal('Cliente Guardado',`El cliente ${cliente.nombre} ha sido creado con exito`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[]
        console.error(err.error.errors)
        console.error('codigo de error '+err.status)
      }
    )
  }

  update():void{
    this.clienteService.update(this.cliente)
    .subscribe(
      response => {
        this.router.navigate(['/clientes'])
        swal('Cliente actualizado',`${response.mensaje}: ${response.cliente.nombre}`,'success')
      },
      err => {
        this.errores = err.error.errors as string[]
        console.error(err.error.errors)
        console.error('codigo de error '+err.status)
      }
    )
  }

}
