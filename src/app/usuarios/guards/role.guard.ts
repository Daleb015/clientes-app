import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (!this.authService.isAuthenticathed()) {
        this.router.navigate(['/login'])
        return false;
      }

      let role = next.data['role'] as string;

      if (this.authService.hasRole(role)) {
        return true;
      }
      swal('Accesso Denegado',`${this.authService.usuario.username} No tiene acceso a esta función`,'warning')
      this.router.navigate(['/clientes'])
      return true;
  }

}
