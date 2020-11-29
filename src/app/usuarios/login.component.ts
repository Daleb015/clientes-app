import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Usuario } from './usuario';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  titulo: string = 'Sign In!';
  usuario: Usuario;

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {

    if (this.authService.isAuthenticathed()) {
      swal('Login',`Hola ${this.authService.usuario.nombre} ya estás autenticado`,'info')
      this.router.navigate(['/clientes'])
    }

  }

  login(): void {
    if (this.usuario.username == null || this.usuario.password == null) {
      swal('Error de Login', 'Password o nombre vacios!', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe((response) => {

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);

      let usuario = this.authService.usuario;

      this.router.navigate(['/clientes']);
      swal(
        'Login',
        `Hola ${usuario.username} has iniciado sesión con exito!`,
        'success'
      );
    }, err => {
      if (err.status==400) {
        swal(
          'Error login',
          'Usuario o clave incorrecta, vuelva a intentar!',
          'error'
        );
      }
    }
    );
  }

}
