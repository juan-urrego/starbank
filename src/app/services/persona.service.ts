import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Persona } from '../models/persona';


@Injectable({providedIn: 'root'})
export class PersonaService {
    private personaUrl = 'http://localhost:9191/personas';
    // headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': "*"
    // });

    constructor(private http: HttpClient) { }

    getPersonas(): Observable<Persona[]> {
        return this.http.get<Persona[]>(this.personaUrl)
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    getPersona(id: number): Observable<Persona> {
        if (id === 0) {
            return of(this.initializePersona());
        }
        const url = `${this.personaUrl}/${id}`;
        return this.http.get<Persona>(url)
            .pipe(
                tap(data => console.log('Obtener Persona: ' + JSON.stringify(data))),
                catchError(this.handleError)
            )
    }

    createPersona(persona: Persona): Observable<Persona> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        const url = `${this.personaUrl}/agregar`;
        persona.idPersona = null;
        return this.http.post<Persona>(url, persona, { headers })
            .pipe(
                tap(data => console.log('crear Persona: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    deletePersona(id: number): Observable<{}> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        const url = `${this.personaUrl}/eliminar/${id}`;
        return this.http.delete<Persona>(url, { headers })
            .pipe(
                tap(data => console.log('eliminar Persona: ' + id)),
                catchError(this.handleError)
            );
    }

    updatePersona(persona: Persona): Observable<Persona> {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        const url = `${this.personaUrl}/actualizar/${persona.idPersona}`;
        return this.http.put<Persona>(url, persona, { headers })
            .pipe(
                tap(() => console.log('update Persona: ' + persona.idPersona)),
                // Return the product on an update
                map(() => persona),
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
    private initializePersona(): Persona {
        // Return an initialized object
        return {
          idPersona: 0,
          direccion: null,
          cliente: null          
        };
      }
}