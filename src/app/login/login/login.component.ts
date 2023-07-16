import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { AngularTokenService } from 'angular-token';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup: UntypedFormGroup;
  constructor(public formBuilder: UntypedFormBuilder, private tokenService: AngularTokenService,
    private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createSigninForm();
  }
  // onLogin() {
  //   localStorage.setItem('isLoggedin', 'true');
  //   this.router.navigate(['/dashboard']);
  // }

  createSigninForm() {
    this.formGroup = this.formBuilder.group({
      email: [null],
      password: [null]
    });
}

signin(event) {
  event.preventDefault();
  if (this.formGroup.valid) {

    this.tokenService.signIn({
      login:  this.formGroup.value.email,
      password:   this.formGroup.value.password,
  }).subscribe(
    res =>  {console.log(res)
      if(res.status === 200){
        this.snackBar.open('Hello ' + res.body.data.name , '', { verticalPosition: 'top', horizontalPosition: 'right',duration: 4000, });

        localStorage.setItem('isLoggedin', 'true');
        localStorage.setItem('user', res.body.data);
        this.router.navigate(['/dashboard']);;
      }
      } ,
      error => { console.log(error)
       this.snackBar.open(error.error.errors[0], 'close', { verticalPosition: 'top', horizontalPosition: 'right' });
      }
  );

  }
}



}
