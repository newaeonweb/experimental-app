import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

const routes = {
  quote: (c: RandomQuoteContext) => `/jokes/random?category=${c.category}`
};

export interface RandomQuoteContext {
  // The quote's category: 'nerdy', 'explicit'...
  category: string;
}

@Injectable()
export class QuoteService {

  constructor(private http: HttpClient) { }

  // getRandomQuote(context: RandomQuoteContext): Observable<string> {
  //   return this.http.get(routes.quote(context), { cache: true })
  //     .pipe(
  //       map((res: Response) => res.json()),
  //       map(body => body.value),
  //       catchError(() => of('Error, could not load joke :-('))
  //     );
  // }

  getRandomQuote(context: RandomQuoteContext): Observable<string[]> {
    return this.http.get(routes.quote(context), {
      headers: new HttpHeaders({'cache': 'true'}),
    })
    // .do(data => console.log('server data:', data))  // debug
      .pipe(catchError(error => this.handleError(error)));

  }

  private handleError (error: HttpErrorResponse) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
