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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy{

  signupForm: UntypedFormGroup;
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
  ngOnDestroy(): void {
    if(this.subscriptionRequest){
      this.subscriptionRequest.unsubscribe();
    }
  }

  ngOnInit(): void {}

  getControl(controlName)
  {
    return this.signupForm.get(controlName);
  }

  onSubmitForm(){
    this.isLoading = true;
    this.isErrors = {
      form: false,
      back: false
    }
    const controls = this.signupForm.controls;
    if(this.signupForm.invalid){
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.isLoading = false;
      this.isErrors['form'] = true;
      return;
    }
    const data = { ...this.signupForm.value };
    this.subscriptionRequest = this._signUp(data);
  }

  private _signUp(data:any){
    return this._authService.signUp(data).subscribe({
      next: (response) => {
        this._router.navigateByUrl('/auth/login');
      },
      error: (e) => {
        this.isLoading = false;
        this.isErrors.back = true;
      }
    });
  }

  private _loadForm(){
    this.signupForm = this._formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      first_name: ['', Validators.compose([Validators.required])],
      last_name: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      agree: ['', Validators.compose([Validators.required])]
    });

  }

}
