import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator, AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {AccountService} from '../account.service';
import {Router} from '@angular/router';
import {Observable, of, timer} from 'rxjs';
import {delay, map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errors: string[];
  constructor( private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }
  createRegisterForm(): void {
    this.registerForm = new FormGroup({
      displayName: new FormControl(null, [Validators.required]),
      email: new FormControl(null,
        [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
        [this.validateEmailNotTaken()]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required])
    }, {
      validators: [this.MustMatch('password', 'confirmPassword')]
    });
  }
  onSubmit(): any {
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/shop');
    }, error => {
      console.log(error);
      this.errors = error.errors;
    });
  }
  get f(): any {
    return this.registerForm;
  }
  MustMatch(controlName: string, matchingControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const field = control.get(controlName).value;
      const fieldConfirmation = control.get(matchingControlName).value;
      if (field !== fieldConfirmation) {
        control.get(matchingControlName).setErrors({incorrect: true});
        return {fieldsNotMatch: true};
      }
      return null;
    };
    /*return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };*/
  }
  validateEmailNotTaken(): AsyncValidatorFn {
    return control => {
      return timer(500).pipe(
        switchMap(() => {
          if (!control.value)
          {
            return of(null);
          }
          return this.accountService.checkEmailExists(control.value).pipe(
            map( res => {
              return res ? {emailExists: true} : null;
            })
          );
        })
      );
    };
  }
}
