import { Cuenta } from './cuenta';
import { Cajero } from './cajero';

export class Operacion {
    idOperacion: number;
    nombre: string;
    fecha: string;
    hora: string;
    cuenta : Cuenta;
    cajero: Cajero;
}