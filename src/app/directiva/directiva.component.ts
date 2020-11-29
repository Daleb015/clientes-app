import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent {

  listaCurso: string[] = ['Reactive','MathAutoComplete','Angular Material','Angular forms','Angular Routing', 'Angular Guard','Angular Material Animations','Angular Material Autocomplete'];
  habilitar: boolean = true;
  constructor() { }

  setHabilitar(): void {
    this.habilitar=(this.habilitar==true)? false: true;
  }


}
