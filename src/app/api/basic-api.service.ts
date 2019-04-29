import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize, } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { defaultMessageError, errorMessageMap } from './error-message-map';
import { ErrorRes, ErrorResponse } from './contracts/error-response';

@Injectable({
  providedIn: 'root'
})
export class BasicApiService implements ApiService {
  private requestsInProgress: number;


  constructor(
    private http: HttpClient,
  ) {
    this.requestsInProgress = 0;
  }

  get<TContract>(url: string, params?: HttpParams): Observable<object>;
  get<TContract>(url: string, params?: HttpParams): Observable<TContract>;
  get<TContract>(url: string, params?: HttpParams): Observable<TContract | object> {
    const options = { headers: this.headers, params };
    this.requestsInProgress++;

    return this.http.get<TContract>(url, options).pipe(
      finalize(() => this.requestsInProgress--),
      catchError(error => throwError(error)),
      catchError(error => this.handleError<ErrorRes>(error, ErrorRes)),
    );
  }

  post<TContract>(url: string, body: TContract, params?: HttpParams): Observable<object>;
  post<TContract>(url: string, body: TContract, params?: HttpParams): Observable<TContract>;
  post<TContract, TResponceContract>(url: string, body: TContract, params?: HttpParams): Observable<TResponceContract>;
  post<TContract, TResponceContract>(url: string, body: TContract, params?: HttpParams)
    : Observable<TResponceContract> | Observable<TContract | object> {
    const options = { headers: this.headers, params };
    this.requestsInProgress++;

    return this.http.post<any>(url, JSON.stringify(body), options).pipe(
      finalize(() => this.requestsInProgress--),
      catchError(error => throwError(error)),
      catchError(error => this.handleError<ErrorRes>(error, ErrorRes)),
    );
  }


  put<TContract>(url: string, params?: HttpParams): Observable<object>;
  put<TContract>(url: string, params?: HttpParams): Observable<TContract>;
  put<TContract>(url: string, body: TContract, params?: HttpParams): Observable<TContract | object> {
    const options = { headers: this.headers, params };
    this.requestsInProgress++;

    return this.http.put<TContract>(url, body, options).pipe(
      finalize(() => this.requestsInProgress--),
      catchError(error => throwError(error)),
      catchError(error => this.handleError<ErrorRes>(error, ErrorRes)),
    );
  }

  delete<TContract>(url: string, params?: HttpParams): Observable<object>;
  delete<TContract>(url: string, params?: HttpParams): Observable<TContract>;
  delete<TContract>(url: string, params?: HttpParams): Observable<TContract | object> {
    const options = { headers: this.headers, params };
    this.requestsInProgress++;

    return this.http.delete<TContract>(url, options).pipe(
      finalize(() => this.requestsInProgress--),
      catchError(error => throwError(error)),
      catchError(error => this.handleError<ErrorRes>(error, ErrorRes)),
    );
  }

  patch<TContract>(url: string, body: TContract, params?: HttpParams): Observable<object>;
  patch<TContract>(url: string, body: TContract, params?: HttpParams): Observable<TContract>;
  patch<TContract, TResponceContract>(url: string, body: TContract, params?: HttpParams): Observable<TResponceContract>;
  patch<TContract, TResponceContract>(url: string, body: TContract, params?: HttpParams)
    : Observable<TResponceContract> | Observable<TContract | object> {
    const options = { headers: this.headers, params };
    this.requestsInProgress++;

    return this.http.patch<any>(url, JSON.stringify(body), options).pipe(
      finalize(() => this.requestsInProgress--),
      catchError(error => throwError(error)),
      catchError(error => this.handleError<ErrorRes>(error, ErrorRes)),
    );
  }

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'authorization-mock'
    });
  }

  handleError<Error>(errorResponse: HttpErrorResponse, type: { new(value): Error }): Observable<Error> {
    return new Observable<Error>(obs => {
      let error;
      if (errorMessageMap[errorResponse.status]) {
        error = new type({ message: errorMessageMap[errorResponse.status] });
      }
      error = errorResponse.error && errorResponse.error.message ? errorResponse.error : new type({ message: defaultMessageError });

      obs.error(error);
      obs.complete();
    });
  }

}
