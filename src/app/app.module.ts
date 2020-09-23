import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import {RouterModule, Routes, Router} from '@angular/router';
import { FormComponent } from './clientes/form.component';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es'
import { LOCALE_ID } from '@angular/core';

registerLocaleData(localeES,'es');

const routes: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes',component: ClientesComponent},
  {path: 'clientes/form',component: FormComponent},
  {path: 'clientes/form/:id',component: FormComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [ClienteService,{provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
