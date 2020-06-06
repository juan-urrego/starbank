import { Empresa } from './empresa';
import { Persona } from './persona';
import { Cuenta } from './cuenta';

export interface Cliente {
    idCliente: number;
    nombre: string;
    ocupacion: string;
    telefono: number;
    empresas: Empresa[];
    personas: Persona[];  
    cuentas: Cuenta[]  
}