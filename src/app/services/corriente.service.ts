import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Corriente } from '../models/corriente';


@Injectable({providedIn: 'root'})
export class CorrienteService {
    private corrienteUrl = 'http://localhost:9191/corrientes';
    // headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': "*"
    // });

    constructor(private http: HttpClient) { }

    getCorrientes(): Observable<Corriente[]> {
        return this.http.get<Corriente[]>(this.corrienteUrl)
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    getCorriente(id: number): Observable<Corriente> {
        if (id === 0) {
            return of(this.initializeCorriente());
        }
        const url = `${this.corrienteUrl}/${id}`;
        return this.http.get<Corriente>(url)
            .pipe(
                tap(data => console.log('Obtener Corriente: ' + JSON.stringify(data))),
                catchError(this.handleError)
            )
    }

    createCorriente(corriente: Corriente): Observable<Corriente> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        const url = `${this.corrienteUrl}/agregar`;
        corriente.idCorriente = null;
        return this.http.post<Corriente>(url, corriente, { headers })
            .pipe(
                tap(data => console.log('crear Corriente: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    deleteCorriente(id: number): Observable<{}> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        const url = `${this.corrienteUrl}/eliminar/${id}`;
        return this.http.delete<Corriente>(url, { headers })
            .pipe(
                tap(data => console.log('eliminar Corriente: ' + id)),
                catchError(this.handleError)
            );
    }

    updateCorriente(corriente: Corriente): Observable<Corriente> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        const url = `${this.corrienteUrl}/actualizar/${corriente.idCorriente}`;
        return this.http.put<Corriente>(url, corriente, { headers })
            .pipe(
                tap(() => console.log('update Corriente: ' + corriente.idCorriente)),
                // Return the product on an update
                map(() => corriente),
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
    private initializeCorriente(): Corriente {
        // Return an initialized object
        return {
          idCorriente: 0,
          cuenta: null          
        };
      }
}