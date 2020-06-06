import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { PersonaService } from '../services/persona.service';
import { EmpresaService } from '../services/empresa.service';
import { CajeroService } from '../services/cajero.service';
import { Cuenta } from '../models/cuenta';
import { CuentaService } from '../services/cuenta.service';

@Component({
    selector: 'selector-name',
    templateUrl: 'cuenta-agregar.component.html'
})

export class CuentaAgregarComponent implements OnInit {
    langs: string[] = ["English", "French", "German"];
    myform: FormGroup;

    titular: FormControl;
    saldo: FormControl;
    estado: FormControl;
    tipo: FormControl;
    idCliente: FormControl;
    idSucursal: FormControl;


    idcliente: number;
    idbanco: number;
    idcuenta: number;
    mensajeError = '';
    cuenta: Cuenta;

    
    constructor(private modalService: NgbModal,
        private router: Router,
        private route: ActivatedRoute,
        private clienteService: ClienteService,
        private personaService: PersonaService,
        private empresaService: EmpresaService,
        private cuentaService: CuentaService,
        private cajeroService: CajeroService) {

    }

    createFormControls() {
      this.titular = new FormControl("", Validators.required);
      this.saldo = new FormControl("0", Validators.required);
      this.estado = new FormControl("", [
        Validators.required
      ]);
      this.tipo = new FormControl("", [
        Validators.required
      ]);
      this.idCliente = new FormControl(this.idcliente, Validators.required);
      this.idSucursal = new FormControl(1, Validators.required);
    }
  
    createForm() {
      this.myform = new FormGroup({
        titular: this.titular,
        saldo: this.saldo,
        estado: this.estado,
        tipo: this.tipo,
        cliente: new FormGroup({
          idCliente: this.idCliente          
        }),
        sucursal: new FormGroup({
            idSucursal: this.idSucursal
        })
      });
    }
  
    ngOnInit() {
        
        
        const param = this.route.snapshot.paramMap.get('idbanco');
        if (param) {
            this.idbanco = +param;

        }
        const param1 = this.route.snapshot.paramMap.get('idcliente');
        if (param1) {
            this.idcliente = +param1;
        }
        const param2 = this.route.snapshot.paramMap.get('idcuenta');
        if (param1) {
            this.idcuenta = +param2;
        }
      this.createFormControls();
      this.createForm();

    }

    onSaveComplete(): void {
        this.myform.reset();
        this.router.navigate([`/banco/${this.idbanco}/cliente/${this.idcliente}`]);
    }
  
    onSubmit() {
        console.log("en el boton");

        if (this.myform.valid) {
            if (this.myform.dirty) {
                const p = { ...this.cuenta, ...this.myform.value };

                if (this.idcuenta === 0) {
                    console.log(p);
                    console.log('grupo' +  this.myform.value);
                    
                    
                    this.cuentaService.createCuenta(p)
                        .subscribe({
                            next: () => this.onSaveComplete(),
                            error: err => this.mensajeError = err
                        });
                } else {
                    this.cuentaService.updateCuenta(p)
                        .subscribe({
                            next: () => this.onSaveComplete(),
                            error: err => this.mensajeError = err
                        });
                }
            } else {
                this.onSaveComplete();
            }
        } else {
            this.mensajeError = 'Verificar los errores de validacion'
        }
    }

    atras(){
        window.history.back();
    }
}