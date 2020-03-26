import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularTokenModule } from 'angular-token';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    LoginRoutingModule,
    HttpClientModule,
    AngularTokenModule.forRoot({
      apiBase:                   'http://localhost:3000',
      apiPath:                    'api/v1',
      
      signInPath:                 'auth/sign_in',
      signInRedirect:             null,
      signInStoredUrlStorageKey:  null,

      signOutPath:                'auth/sign_out',
      validateTokenPath:          'auth/validate_token',
      signOutFailedValidate:      false,

      registerAccountPath:        'auth',
      deleteAccountPath:          'auth',
      registerAccountCallback:    window.location.href,

      updatePasswordPath:         'auth',
      resetPasswordPath:          'auth/password',
      resetPasswordCallback:      window.location.href,

      oAuthBase:                  window.location.origin,
      oAuthPaths: {
          github:                 'auth/github'
      },
      oAuthCallbackPath:          'oauth_callback',
      oAuthWindowType:            'newWindow',
      oAuthWindowOptions:         null,

      
    }),
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule
  ],
  providers:    [ AngularTokenModule ],
  declarations: [LoginComponent]
})
export class LoginModule {}
