import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Empresa } from '../models/empresa';


@Injectable({providedIn: 'root'})
export class EmpresaService {
    private empresaUrl = 'http://localhost:9191/empresas';
    // headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': "*"
    // });

    constructor(private http: HttpClient) { }

    getEmpresas(): Observable<Empresa[]> {
        return this.http.get<Empresa[]>(this.empresaUrl)
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    getEmpresa(id: number): Observable<Empresa> {
        if (id === 0) {
            return of(this.initializeEmpresa());
        }
        const url = `${this.empresaUrl}/${id}`;
        return this.http.get<Empresa>(url)
            .pipe(
                tap(data => console.log('Obtener Empresa: ' + JSON.stringify(data))),
                catchError(this.handleError)
            )
    }

    createEmpresa(empresa: Empresa): Observable<Empresa> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        const url = `${this.empresaUrl}/agregar`;
        empresa.idEmpresa = null;
        return this.http.post<Empresa>(url, empresa, { headers })
            .pipe(
                tap(data => console.log('crear Empresa: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    deleteEmpresa(id: number): Observable<{}> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        const url = `${this.empresaUrl}/eliminar/${id}`;
        return this.http.delete<Empresa>(url, { headers })
            .pipe(
                tap(data => console.log('eliminar Empresa: ' + id)),
                catchError(this.handleError)
            );
    }

    updateEmpresa(empresa: Empresa): Observable<Empresa> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        const url = `${this.empresaUrl}/actualizar/${empresa.idEmpresa}`;
        return this.http.put<Empresa>(url, empresa, { headers })
            .pipe(
                tap(() => console.log('update Empresa: ' + empresa.idEmpresa)),
                // Return the product on an update
                map(() => empresa),
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
    private initializeEmpresa(): Empresa {
        // Return an initialized object
        return {
          idEmpresa: 0,
          nit: null,
          nombre: null,
          sector: null,
          direccion: null,
          cliente: null        
        };
      }
}