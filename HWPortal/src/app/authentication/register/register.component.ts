import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthResponseDto } from '../../_interfaces/AuthResponseDto';
import { RegistrationResponseDto } from '../../_interfaces/RegistrationResponseDto';
import { UserForAuthenticationDto } from '../../_interfaces/UserForAuthenticationDto';
import { UserForRegistrationDto } from '../../_interfaces/UserForRegistrationDto';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;

  public errorMessage: string = '';
  public successMessage: string = '';
 
  public isRegisterRoute!: boolean;
  private returnUrl!: string;

  constructor(private _authService: AuthenticationService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {

    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';

    if (this._router.url === '/authentication/register') {
      this.isRegisterRoute = true;
    } else {
      this.isRegisterRoute = false;
    }

    this.registerForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    });
  }

  public onRegisterOrLogin(registerFormValue: any): void {
    this.resetMessages();

    const formValues = { ...registerFormValue };
    if (this.isRegisterRoute) { //Регистрация пользователя
      const user: UserForRegistrationDto = {
        email: formValues.email,
        password: formValues.password,
        confirmPassword: formValues.confirmPassword
      };
      this._authService.registerUser("api/accounts/registration", user)
        .subscribe((responce: RegistrationResponseDto) => {
          this.resetMessages();
          this.successMessage = "Регистрация прошла упешно!";
          this.registerForm.setValue({ 'password': '', 'confirmPassword': '' });

          setTimeout(() => {
            this._router.navigate(["api/accounts/login"]);
          }, 1500);
        },
          error => {
            this.errorMessage = error;
          });
    } else { //Логин пользователя
      const user: UserForAuthenticationDto = {
        email: formValues.email,
        password: formValues.password
      }
      this._authService.loginUser("api/accounts/login", user)
        .subscribe((responce: AuthResponseDto) => {
          this.resetMessages();
          this.successMessage = "Пользователь успешно аутентифицирован!";
          const token = responce.token;
          localStorage.setItem(environment.jwtTokenName, token);

          setTimeout(() => {
            this.registerForm.reset();
            this._authService.sendAuthStateChangeNotification(responce.isAuthSuccessful);
            this._router.navigate([this.returnUrl]);
          }, 1500);
          
        }, error => {
          this.errorMessage = error;
        });
    }
    
  }

  //public validateControl = (controlName: string) => {
  //  return this.registerForm.controls[controlName].invalid && this.registerForm.controls[controlName].touched
  //}
  //public hasError = (controlName: string, errorName: string) => {
  //  return this.registerForm.controls[controlName].hasError(errorName)
  //}

  private resetMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }
}
