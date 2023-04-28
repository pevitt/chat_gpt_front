import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMessage } from '../interfaces/auth.models';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private _http: HttpClient) {}

  getMessages(): Observable<IMessage[]> {
    return this._http.get<IMessage[]>(environment.requestMessage);
  }
  requestMessages(): Observable<IMessage> {
    return this._http.post<IMessage>(environment.requestMessage, {});
  }
}
