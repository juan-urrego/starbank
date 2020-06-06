import { Sucursal } from './sucursal';

export interface Cajero {
    idCajero: number;
    direccion: string;
    sucursal: Sucursal;
}