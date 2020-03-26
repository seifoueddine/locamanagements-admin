import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularTokenService } from 'angular-token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  constructor(public formBuilder: FormBuilder, private tokenService: AngularTokenService,
    private router: Router) { }

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
        localStorage.setItem('isLoggedin', 'true');
        localStorage.setItem('user', res.body.data);
        this.router.navigate(['/dashboard']);;
      }
      } ,
      error =>    console.log(error)
  );

  }
}



}
