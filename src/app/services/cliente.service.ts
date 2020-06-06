import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Cliente } from '../models/cliente';


@Injectable({providedIn: 'root'})
export class ClienteService {
    private clienteUrl = 'http://localhost:9191/clientes';
    // headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': "*"
    // });

    constructor(private http: HttpClient) { }

    getClientes(): Observable<Cliente[]> {
        return this.http.get<Cliente[]>(this.clienteUrl)
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    getCliente(id: number): Observable<Cliente> {
        if (id === 0) {
            return of(this.initializeCliente());
        }
        const url = `${this.clienteUrl}/${id}`;
        return this.http.get<Cliente>(url)
            .pipe(
                tap(data => console.log('Obtener Cliente: ' + JSON.stringify(data))),
                catchError(this.handleError)
            )
    }

    getClienteNombre(nombre: string): Observable<Cliente> {
        const url = `${this.clienteUrl}/nombre/${nombre}`;
        return this.http.get<Cliente>(url)
            .pipe(
                tap(data => console.log('Obtener Cliente: ' + JSON.stringify(data))),
                catchError(this.handleError)
            )
    }

    createCliente(cliente: Cliente): Observable<Cliente> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        const url = `${this.clienteUrl}/agregar`;
        cliente.idCliente = null;
        return this.http.post<Cliente>(url, cliente, { headers })
            .pipe(
                tap(data => console.log('crear Cliente: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    deleteCliente(id: number): Observable<{}> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        const url = `${this.clienteUrl}/eliminar/${id}`;
        return this.http.delete<Cliente>(url, { headers })
            .pipe(
                tap(data => console.log('eliminar Cliente: ' + id)),
                catchError(this.handleError)
            );
    }

    updateCliente(cliente: Cliente): Observable<Cliente> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        const url = `${this.clienteUrl}/actualizar/${cliente.idCliente}`;
        return this.http.put<Cliente>(url, cliente, { headers })
            .pipe(
                tap(() => console.log('update Cliente: ' + cliente.idCliente)),
                // Return the product on an update
                map(() => cliente),
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
    private initializeCliente(): Cliente {
        // Return an initialized object
        return {
          idCliente: 0,
          nombre: null,
          ocupacion: null,
          telefono: null,
          empresas: null,
          personas: null,
          cuentas: null
        };
      }
}