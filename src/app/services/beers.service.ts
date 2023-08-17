import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {MAX_ITEM_TO_DISPLAY, NUMBER_ITEMS_PER_PAGE, URL_API} from "../constants/constants.file";
import {Beer} from "../interfaces/beer.model";
import {catchError, map, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BeersService {

  private maxItem = MAX_ITEM_TO_DISPLAY;
  readonly beersUrl: string = URL_API;

  constructor(private http: HttpClient) { }

  /**
   * GET beers whose contains search term.
   * @param name - name of the beer to search
   * @param page - number of the page to load
   * @param perPage - amount of beers returned in each request
   */
  searchBeerByNameByPage(name: string, page: string, perPage: string): Observable<Beer[]> {
    name = name.trim();

    let options = new HttpParams();
    options = options.append('beer_name', name);
    options = options.append('per_page', perPage);
    options = options.append('page', page);


    return this.http.get<Beer[]>(this.beersUrl,
      {
        params: options,
        responseType: 'json'
      })
      .pipe(
        map(beers => {
          return beers;
        }),
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} beers by name${name}`);
        }),
        catchError(this.handleError<Beer[]>(`searchBeers name${name}`))
      );
  }

  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   * @param operation - name of the operation that failed
   */
  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {

      // Simulation: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      const message = (error.error instanceof ErrorEvent) ?
        error.error.message :
        `server returned code ${error.status} with body "${error.error}"`;

      throw new Error(`${operation} failed: ${message}`);
    };
  }

  private log(message: string) {
    console.log('BeersService: ' + message);
  }
}
