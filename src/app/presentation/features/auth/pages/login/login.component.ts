import { Component, OnInit, OnDestroy } from '@angular/core';
import { 
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators 
} from '@angular/forms';

import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/data/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{

  loginForm: UntypedFormGroup;
  isLoading: boolean = false;
  isErrors = {
    form: false,
    back: false
  }
  subscriptionRequest: Subscription;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _authService: AuthService,
    private _router: Router
  ){
    this.isLoading = false;
    this._loadForm();

  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    if(this.subscriptionRequest){
      this.subscriptionRequest.unsubscribe();
    }
  }

  onSubmitForm(){
    this.isLoading = true;
    this.isErrors = {
      form: false,
      back: false
    }
    const controls = this.loginForm.controls;
    if(this.loginForm.invalid){
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.isLoading = false;
      this.isErrors['form'] = true;
      return;
    }
    const data = { ...this.loginForm.value };
    this.subscriptionRequest = this._login(data);
  }

  private _login(data:any){
    return this._authService.login(data).subscribe({
      next: (response) => {
        localStorage.setItem('adviser.token', response.token);
        this._router.navigateByUrl('/');
        this.isLoading = false;
      },
      error: (e) => {
        this.isLoading = false;
        this.isErrors.back = true;
      }
    });
  }

  private _loadForm(){
    this.loginForm = this._formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });

  }

}
