import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public modal: boolean = false;

  constructor() { }

  abrirModal(){
    console.log('llega a modal service')
    this.modal=true;
  }

  cerrarModal(){
    this.modal=false;
  }
}
