import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Sucursal } from '../models/sucursal';


@Injectable({providedIn: 'root'})
export class SucursalService {
    private sucursalUrl = 'http://localhost:9191/sucursales';
    // headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': "*"
    // });

    constructor(private http: HttpClient) { }

    getSucursals(): Observable<Sucursal[]> {
        return this.http.get<Sucursal[]>(this.sucursalUrl)
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    getSucursal(id: number): Observable<Sucursal> {
        if (id === 0) {
            return of(this.initializeSucursal());
        }
        const url = `${this.sucursalUrl}/${id}`;
        return this.http.get<Sucursal>(url)
            .pipe(
                tap(data => console.log('Obtener Sucursal: ' + JSON.stringify(data))),
                catchError(this.handleError)
            )
    }

    createSucursal(sucursal: Sucursal): Observable<Sucursal> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        const url = `${this.sucursalUrl}/agregar`;
        sucursal.idSucursal = null;
        return this.http.post<Sucursal>(url, sucursal, { headers })
            .pipe(
                tap(data => console.log('crear Sucursal: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    deleteSucursal(id: number): Observable<{}> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        const url = `${this.sucursalUrl}/eliminar/${id}`;
        return this.http.delete<Sucursal>(url, { headers })
            .pipe(
                tap(data => console.log('eliminar Sucursal: ' + id)),
                catchError(this.handleError)
            );
    }

    updateSucursal(sucursal: Sucursal): Observable<Sucursal> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        const url = `${this.sucursalUrl}/actualizar/${sucursal.idSucursal}`;
        return this.http.put<Sucursal>(url, sucursal, { headers })
            .pipe(
                tap(() => console.log('update Sucursal: ' + sucursal.idSucursal)),
                // Return the product on an update
                map(() => sucursal),
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
    private initializeSucursal(): Sucursal {
        // Return an initialized object
        return {
          idSucursal: 0,
          nombre: null,
          direccion: null,
          ciudad: null,
          saldo: null
        };
      }
}