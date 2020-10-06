import { Region } from './region';
export class Cliente {
  id: string;
  nombre: string = 'Paila';
  apellido: string;
  createAt: string;
  email: string;
  foto: string;
  region: Region;
}
