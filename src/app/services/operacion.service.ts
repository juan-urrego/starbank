import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Operacion } from '../models/operacion';


@Injectable({providedIn: 'root'})
export class OperacionService {
    private operacionUrl = 'http://localhost:9191/operaciones';
    // headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': "*"
    // });

    constructor(private http: HttpClient) { }

    getOperacions(): Observable<Operacion[]> {
        return this.http.get<Operacion[]>(this.operacionUrl)
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    getOperacion(id: number): Observable<Operacion> {
        if (id === 0) {
            return of(this.initializeOperacion());
        }
        const url = `${this.operacionUrl}/${id}`;
        return this.http.get<Operacion>(url)
            .pipe(
                tap(data => console.log('Obtener Operacion: ' + JSON.stringify(data))),
                catchError(this.handleError)
            )
    }

    createOperacion(operacion: Operacion): Observable<Operacion> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        const url = `${this.operacionUrl}/agregar`;
        operacion.idOperacion = null;
        return this.http.post<Operacion>(url, operacion, { headers })
            .pipe(
                tap(data => console.log('crear Operacion: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    deleteOperacion(id: number): Observable<{}> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        const url = `${this.operacionUrl}/eliminar/${id}`;
        return this.http.delete<Operacion>(url, { headers })
            .pipe(
                tap(data => console.log('eliminar Operacion: ' + id)),
                catchError(this.handleError)
            );
    }

    updateOperacion(operacion: Operacion): Observable<Operacion> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        const url = `${this.operacionUrl}/actualizar/${operacion.idOperacion}`;
        return this.http.put<Operacion>(url, operacion, { headers })
            .pipe(
                tap(() => console.log('update Operacion: ' + operacion.idOperacion)),
                // Return the product on an update
                map(() => operacion),
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
    private initializeOperacion(): Operacion {
        // Return an initialized object
        return {
          idOperacion: 0,
          nombre: null,
          fecha: null,
          hora: null,
          cuenta: null,
          cajero: null
        };
      }
}