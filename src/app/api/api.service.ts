import { ErrorRes } from './contracts/error-response';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService {
  abstract get<TContract>(url: string, params?: HttpParams): Observable<object>;
  abstract get<TContract>(url: string, params?: HttpParams): Observable<TContract>;
  abstract post<TContract>(url: string, body: TContract, params?: HttpParams): Observable<object>;
  abstract post<TContract>(url: string, body: TContract, params?: HttpParams): Observable<TContract>;
  abstract post<TContract, TResponceContract>(url: string, body: TContract, params?: HttpParams): Observable<TResponceContract>;
  abstract put<TContract>(url: string, body: TContract, params?: HttpParams): Observable<object>;
  abstract put<TContract>(url: string, body: TContract, params?: HttpParams): Observable<TContract>;
  abstract delete<TContract>(url: string, params?: HttpParams): Observable<object>;
  abstract delete<TContract>(url: string, params?: HttpParams): Observable<TContract>;
  abstract patch<TContract>(url: string, body: TContract, params?: HttpParams): Observable<object>;
  abstract patch<TContract>(url: string, body: TContract, params?: HttpParams): Observable<TContract>;
  abstract patch<TContract, TResponceContract>(url: string, body: TContract, params?: HttpParams): Observable<TResponceContract>;

  abstract handleError<TError>(errorResponse: HttpErrorResponse, type: { new(value): TError }): Observable<TError>;
}
