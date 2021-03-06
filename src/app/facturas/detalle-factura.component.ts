import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Factura } from './models/factura';
import { ItemFactura } from './models/item-factura';
import { FacturaService } from './services/factura.service';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html',
})
export class DetalleFacturaComponent implements OnInit {
  constructor(
    private facturaService: FacturaService,
    private activatedRoute: ActivatedRoute
  ) {}

  factura: Factura;
  titulo: string = 'Factura';

  id: string;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let id = params.get('id');
      this.facturaService.getFactura(id).subscribe((factura) => {
        this.factura = factura;
      });
    });
  }


}
