import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Ahorro } from '../models/ahorro';


@Injectable({providedIn: 'root'})
export class AhorroService {
    private ahorroUrl = 'http://localhost:9191/ahorros';
    // headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': "*"
    // });

    constructor(private http: HttpClient) { }

    getAhorros(): Observable<Ahorro[]> {
        return this.http.get<Ahorro[]>(this.ahorroUrl)
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    getAhorro(id: number): Observable<Ahorro> {
        if (id === 0) {
            return of(this.initializeAhorro());
        }
        const url = `${this.ahorroUrl}/${id}`;
        return this.http.get<Ahorro>(url)
            .pipe(
                tap(data => console.log('Obtener Ahorro: ' + JSON.stringify(data))),
                catchError(this.handleError)
            )
    }

    createAhorro(ahorro: Ahorro): Observable<Ahorro> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        const url = `${this.ahorroUrl}/agregar`;
        ahorro.idAhorro = null;
        return this.http.post<Ahorro>(url, ahorro, { headers })
            .pipe(
                tap(data => console.log('crear Ahorro: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    deleteAhorro(id: number): Observable<{}> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        const url = `${this.ahorroUrl}/eliminar/${id}`;
        return this.http.delete<Ahorro>(url, { headers })
            .pipe(
                tap(data => console.log('eliminar Ahorro: ' + id)),
                catchError(this.handleError)
            );
    }

    updateAhorro(ahorro: Ahorro): Observable<Ahorro> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        const url = `${this.ahorroUrl}/actualizar/${ahorro.idAhorro}`;
        return this.http.put<Ahorro>(url, ahorro, { headers })
            .pipe(
                tap(() => console.log('update Ahorro: ' + ahorro.idAhorro)),
                // Return the product on an update
                map(() => ahorro),
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


    private initializeAhorro(): Ahorro {
        // Return an initialized object
        return {
          idAhorro: 0,
          intereses : null,
          cuenta: null
        };
      }
}