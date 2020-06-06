import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { BancoComponent } from './cajero/banco.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CuentaAgregarComponent } from './cuenta/cuenta-agregar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteAgregarComponent } from './cliente/cliente-agregar.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    BancoComponent,
    CuentaComponent,
    CuentaAgregarComponent,
    ClienteAgregarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
