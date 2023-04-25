import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { finalize, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let reqModified;
    const { url } = request;
    const headers: any = {
      'Content-Type': 'application/json',
    };
    const token = localStorage.getItem('adviser.token');
    if (token) {
      headers.Authorization = `Token ${token}`;
    }
    reqModified = request.clone({
      url: API_URL + url,
      setHeaders: headers,
    });

    return this._continueRequest(reqModified, next);
  }

  private _continueRequest(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: any) => this._catchError(API_URL, req, err)),
        map((response: any) => {
          return response;
        }
      ));
  }

  private _catchError(server: string, req: HttpRequest<any>, error: any) {
    return throwError(error);
  }
}
