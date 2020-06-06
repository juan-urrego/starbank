import { Cliente } from './cliente';

export interface Empresa {
    idEmpresa: number;
    nit: string;
    nombre: string;
    sector: string;
    direccion: string;
    cliente: Cliente;
}