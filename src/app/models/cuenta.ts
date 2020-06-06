import { Cliente } from './cliente';
import { Sucursal } from './sucursal';
import { Operacion } from './operacion';

export interface Cuenta {
    idCuenta: number;
    titular: string;
    saldo: number;
    tipo: string;
    estado: string;
    cliente: Cliente;
    sucursal: Sucursal;
    operaciones : Operacion[];
}