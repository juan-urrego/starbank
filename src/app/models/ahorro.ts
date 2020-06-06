import { Cuenta } from './cuenta';


export interface Ahorro {
    idAhorro: number;
    intereses: number;
    cuenta: Cuenta;
}