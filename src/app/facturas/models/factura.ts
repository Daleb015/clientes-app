import { Cliente } from 'src/app/clientes/cliente';
import { ItemFactura } from './item-factura';

export class Factura {
  id: string;
  descripcion: string;
  observacion: string;
  items: Array<ItemFactura> = [];
  cliente: Cliente;
  total: number;
  createAt: string;

  calculargranTotal(): number {
    this.total = 0;
    this.items.forEach((item: ItemFactura) => {
      this.total = this.total + item.calcularImporte();
    });
    return this.total;
  }
}
