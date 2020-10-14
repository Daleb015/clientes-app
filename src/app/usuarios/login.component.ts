import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo: string = 'Sign In!';
  usuario: Usuario;

  constructor() {
    this.usuario= new Usuario;
  }

  ngOnInit(): void {
  }

  login(): void{
    console.log(this.usuario);
    if (this.usuario.username==null||this.usuario.password==null) {
      swal('Error de Login','Password o nombre vacios!','error');
      return;
    }

  }

}
