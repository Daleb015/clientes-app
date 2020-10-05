import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public modal: boolean = false;
  private _notificarUpload = new EventEmitter<any>();

  constructor() { }

  get notificarUpload(): EventEmitter<any>{
    return this._notificarUpload;
  }

  abrirModal(){
    console.log('llega a modal service')
    this.modal=true;
  }

  cerrarModal(){
    this.modal=false;
  }
}
