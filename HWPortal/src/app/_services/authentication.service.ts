import { RegistrationResponseDto } from '../_interfaces/RegistrationResponseDto';
import { UserForRegistrationDto } from '../_interfaces/UserForRegistrationDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from './environment-url.service';
import { UserForAuthenticationDto } from '../_interfaces/UserForAuthenticationDto';
import { AuthResponseDto } from '../_interfaces/AuthResponseDto';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _authChangeSub = new Subject<boolean>()
  public authChanged = this._authChangeSub.asObservable();

  constructor(private _http: HttpClient, private _envUrl: EnvironmentUrlService, private _jwtHelper: JwtHelperService) { }

  public registerUser = (route: string, body: UserForRegistrationDto) => {
    return this._http.post<RegistrationResponseDto>(this._envUrl.createCompleteRoute(route), body);
  }

  public loginUser = (route: string, body: UserForAuthenticationDto) => {
    return this._http.post<AuthResponseDto>(this._envUrl.createCompleteRoute(route), body);
  }

  public sendAuthStateChangeNotification = (newUserAuthState: boolean) => {
    if (newUserAuthState === false) {
      this._authChangeSub.next(newUserAuthState);
    }
    const token = localStorage.getItem(this._envUrl.jwtTokenName);
    if (newUserAuthState === true && token !== null && !this._jwtHelper.isTokenExpired(token)) {
      this._authChangeSub.next(newUserAuthState);
    }
  }

  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem(this._envUrl.jwtTokenName);
    const result = token !== null && !this._jwtHelper.isTokenExpired(token);
    if (!result && token !== null) {
      localStorage.removeItem(this._envUrl.jwtTokenName);
      this._authChangeSub.next(false);
    }
    return result;
  }
}
