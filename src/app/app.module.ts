import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { XhrInterceptor } from './http.interceptor';
import { MatChipsModule } from '@angular/material/chips';
;




@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    MatCardModule,
    MatChipsModule,
  ],
  providers: [  {provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true},],
  bootstrap: [AppComponent]
})
export class AppModule {}
