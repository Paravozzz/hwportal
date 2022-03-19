import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../environments/environment';
import { AuthenticationService } from './_services/authentication.service';
import { EnvironmentUrlService } from './_services/environment-url.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  public isUserAuthenticated: boolean = false;
  private subscriptions!: Subscription;

  constructor(private _envUrl: EnvironmentUrlService, private _authService: AuthenticationService, private _router: Router, private _http: HttpClient) { }

  ngOnInit(): void {
    this._authService.authChanged.subscribe(res => {
        this.isUserAuthenticated = res;
    });

    this.isUserAuthenticated = this._authService.isUserAuthenticated();

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public roleTest() {
    this._http.post(this._envUrl.createCompleteRoute('roletest'), "roletes tbody").subscribe(resp => {
      console.log(resp)
    }, err => {
      console.log(err);
    })
  }

  public LogoutUser(): void {
    localStorage.removeItem(environment.jwtTokenName);
    setTimeout(() => {
      this._authService.sendAuthStateChangeNotification(false);
      this._router.navigate(["/"]);
    }, 300);
  }
}


