import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { 
  IProfile, 
  ILogin, 
  ISignup, 
  ITokenResponse } from '../interfaces/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient) { }

  login(data: ILogin): Observable<ITokenResponse> {
    return this._http.post<ITokenResponse>(environment.loginPath, data);
  }

  signUp(data: ISignup) {
    return this._http.post(environment.signPath, data);
  }

  getProfile(): Observable<IProfile> {
    return this._http.get<IProfile>(environment.profilePath);
  }

  updateProfile(data: IProfile): Observable<IProfile> {
    return this._http.put<IProfile>(environment.profilePath, data);
  }

}
