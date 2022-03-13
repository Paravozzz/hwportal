import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, ResolveEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegistrationResponseDto } from '../../_interfaces/RegistrationResponseDto';
import { UserForRegistrationDto } from '../../_interfaces/UserForRegistrationDto';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  public registrationError: boolean = false;
  public registrationErrors: string[] = [];
  public registrationSuccess: boolean = false;

  public isRegisterRoute!: boolean;
  private subscription!: Subscription;
  constructor(private _authService: AuthenticationService, private _router: Router) { }

  ngOnInit(): void {

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

  public onLogin(registerFormValue: any) {
    alert("login!");
  }

  public onRegisterOrLogin(registerFormValue: any) {
    this.resetErrors();

    const formValues = { ...registerFormValue };
    if (this.isRegisterRoute) { //Регистрация пользователя
      const user: UserForRegistrationDto = {
        email: formValues.email,
        password: formValues.password,
        confirmPassword: formValues.confirmPassword
      };
      this._authService.registerUser("api/accounts/registration", user)
        .subscribe((responce: RegistrationResponseDto) => {
          this.resetErrors();
          this.registrationSuccess = true;
          this.registerForm.reset();
        },
          error => {
            this.registrationError = true;
            this.registrationErrors = error.error.errors;
          })
    } else { //Логин пользователя

    }
    
  }

  //public validateControl = (controlName: string) => {
  //  return this.registerForm.controls[controlName].invalid && this.registerForm.controls[controlName].touched
  //}
  //public hasError = (controlName: string, errorName: string) => {
  //  return this.registerForm.controls[controlName].hasError(errorName)
  //}

  private resetErrors() {
    this.registrationError = false;
    this.registrationErrors = [];
  }
}
