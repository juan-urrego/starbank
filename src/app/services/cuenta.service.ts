import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Cuenta } from '../models/cuenta';


@Injectable({providedIn: 'root'})
export class CuentaService {
    private cuentaUrl = 'http://localhost:9191/cuentas';
    // headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': "*"
    // });

    constructor(private http: HttpClient) { }

    getCuentas(): Observable<Cuenta[]> {
        return this.http.get<Cuenta[]>(this.cuentaUrl)
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    getCuenta(id: number): Observable<Cuenta> {
        if (id === 0) {
            return of(this.initializeCuenta());
        }
        const url = `${this.cuentaUrl}/${id}`;
        return this.http.get<Cuenta>(url)
            .pipe(
                tap(data => console.log('Obtener Cuenta: ' + JSON.stringify(data))),
                catchError(this.handleError)
            )
    }

    createCuenta(cuenta: Cuenta): Observable<Cuenta> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        const url = `${this.cuentaUrl}/agregar`;
        cuenta.idCuenta = null;
        return this.http.post<Cuenta>(url, cuenta, { headers })
            .pipe(
                tap(data => console.log('crear Cuenta: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    deleteCuenta(id: number): Observable<{}> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        const url = `${this.cuentaUrl}/eliminar/${id}`;
        return this.http.delete<Cuenta>(url, { headers })
            .pipe(
                tap(data => console.log('eliminar Cuenta: ' + id)),
                catchError(this.handleError)
            );
    }

    consignarCuenta(cuenta: Cuenta, dinero: number): Observable<Cuenta> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        const url = `${this.cuentaUrl}/actualizar/${cuenta.idCuenta}/consignar/${dinero}`;
        return this.http.put<Cuenta>(url, cuenta, { headers })
            .pipe(
                tap(() => console.log('update Cuenta: ' + cuenta.idCuenta)),
                // Return the product on an update
                map(() => cuenta),
                catchError(this.handleError)
            );
    }

    desactivarCuenta(cuenta: Cuenta, estado: string): Observable<Cuenta> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        console.log(cuenta);
        
        const url = `${this.cuentaUrl}/actualizar/${cuenta.idCuenta}/estado/${estado}`;

        return this.http.put<Cuenta>(url, cuenta, { headers })
            .pipe(
                tap(() => console.log('update Cuenta: ' + cuenta.idCuenta)),
                // Return the product on an update
                map(() => cuenta),
                catchError(this.handleError)
            );
    }

    retirarCuenta(cuenta: Cuenta, dinero: number): Observable<Cuenta> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        const url = `${this.cuentaUrl}/actualizar/${cuenta.idCuenta}/retirar/${dinero}`;
        return this.http.put<Cuenta>(url, cuenta, { headers })
            .pipe(
                tap(() => console.log('update Cuenta: ' + cuenta.idCuenta)),
                // Return the product on an update
                map(() => cuenta),
                catchError(this.handleError)
            );
    }
    updateCuenta(cuenta: Cuenta): Observable<Cuenta> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        const url = `${this.cuentaUrl}/actualizar/${cuenta.idCuenta}`;
        return this.http.put<Cuenta>(url, cuenta, { headers })
            .pipe(
                tap(() => console.log('update Cuenta: ' + cuenta.idCuenta)),
                // Return the product on an update
                map(() => cuenta),
                catchError(this.handleError)
            );
    }



    private handleError(err) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
        }
        console.error(err);
        return throwError(errorMessage);
    }
    private initializeCuenta(): Cuenta {
        // Return an initialized object
        return {
          idCuenta: 0,
          titular: null,
          saldo: null,
          sucursal: null,
          tipo: null,
          cliente: null,
          estado: null ,
          operaciones: null        
        };
      }
}