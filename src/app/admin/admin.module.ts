import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { TopNavComponent } from './layout/top-nav/top-nav.component';
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularTokenModule } from 'angular-token';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatListModule,
   // ReactiveFormsModule,
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
    
  ],
  providers:    [ AngularTokenModule ],
  declarations: [LayoutComponent, TopNavComponent, SideNavComponent]
})
export class AdminModule {}
