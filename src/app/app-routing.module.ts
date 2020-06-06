import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { BancoComponent } from './cajero/banco.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { CuentaAgregarComponent } from './cuenta/cuenta-agregar.component';
import { ClienteAgregarComponent } from './cliente/cliente-agregar.component';



const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {path: 'welcome' , component: WelcomeComponent},
    {path: 'banco' , component: BancoComponent},    
    {path: 'cliente' , component: ClienteAgregarComponent},    
    {path: 'banco/:idbanco/cliente/:idcliente' , component: CuentaComponent},
    {path: 'banco/:idbanco/cliente/:idcliente/:idcuenta' , component: CuentaAgregarComponent},
    {path: '' , redirectTo: 'welcome', pathMatch: 'full'},
    {path: '**' , redirectTo: 'welcome' , pathMatch: 'full'}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
