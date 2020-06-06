import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Cajero } from '../models/cajero';


@Injectable({providedIn: 'root'})
export class CajeroService {
    private cajeroUrl = 'http://localhost:9191/cajeros';
    // headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': "*"
    // });

    constructor(private http: HttpClient) { }

    getCajeros(): Observable<Cajero[]> {
        return this.http.get<Cajero[]>(this.cajeroUrl)
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    getCajero(id: number): Observable<Cajero> {
        if (id === 0) {
            return of(this.initializeCajero());
        }
        const url = `${this.cajeroUrl}/${id}`;
        return this.http.get<Cajero>(url)
            .pipe(
                tap(data => console.log('Obtener Cajero: ' + JSON.stringify(data))),
                catchError(this.handleError)
            )
    }

    createCajero(cajero: Cajero): Observable<Cajero> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        const url = `${this.cajeroUrl}/agregar`;
        cajero.idCajero = null;
        return this.http.post<Cajero>(url, cajero, { headers })
            .pipe(
                tap(data => console.log('crear Cajero: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    deleteCajero(id: number): Observable<{}> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        const url = `${this.cajeroUrl}/eliminar/${id}`;
        return this.http.delete<Cajero>(url, { headers })
            .pipe(
                tap(data => console.log('eliminar Cajero: ' + id)),
                catchError(this.handleError)
            );
    }

    updateCajero(cajero: Cajero): Observable<Cajero> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        const url = `${this.cajeroUrl}/actualizar/${cajero.idCajero}`;
        return this.http.put<Cajero>(url, cajero, { headers })
            .pipe(
                tap(() => console.log('update Cajero: ' + cajero.idCajero)),
                // Return the product on an update
                map(() => cajero),
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
    private initializeCajero(): Cajero {
        // Return an initialized object
        return {
          idCajero: 0,
          sucursal: null,
          direccion: null          
        };
      }
}