import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { CajeroService } from '../services/cajero.service';
import { Cajero } from '../models/cajero';
import { Cliente } from '../models/cliente';
import { EmpresaService } from '../services/empresa.service';
import { PersonaService } from '../services/persona.service';
import { Persona } from '../models/persona';
import { Empresa } from '../models/empresa';
import { OperacionService } from '../services/operacion.service';
import { Operacion } from '../models/operacion';
import { FormGroup, FormControl, Form, Validators } from '@angular/forms';
import { Cuenta } from '../models/cuenta';
import { CuentaService } from '../services/cuenta.service';

@Component({
    selector: 'cuenta',
    templateUrl: 'cuenta.component.html'
})

export class CuentaComponent implements OnInit {
    closeResult = '';
    title = "Cliente"
    idcliente: number;
    idbanco: number;
    cajero: Cajero;
    persona: Persona;
    empresa: Empresa;
    cliente: Cliente;
    mensajeError = '';
    idcuenta: number;
    operacions: Operacion[];
    operacion: Operacion;
    cuentaEstado: Cuenta;

    operacionForm: FormGroup;
    nombre: FormControl;
    fecha: FormControl;
    hora: FormControl;
    idCuenta: FormControl;
    idCajero: FormControl;

    dineroConsignar = 0;
    dineroRetirar= 0;


    momentoActual = new Date()
    horaImpresa: string;
    fechaImpresa: string;
    nombreOperacion: string;
    cuentaAdd: Cuenta;

    myform: FormGroup;
    
    titular: FormControl;
    saldo: FormControl;
    estado: FormControl;
    tipo: FormControl;
    idCliente: FormControl;
    idSucursal: FormControl;

    cuenta: Cuenta;



    constructor(private modalService: NgbModal,
        private router: Router,
        private route: ActivatedRoute,
        private clienteService: ClienteService,
        private personaService: PersonaService,
        private empresaService: EmpresaService,
        private cuentaService: CuentaService,
        private operacionService: OperacionService,
        private cajeroService: CajeroService) { }

    ngOnInit() {
        const param = this.route.snapshot.paramMap.get('idbanco');
        if (param) {
            this.idbanco = +param;

        }
        const param1 = this.route.snapshot.paramMap.get('idcliente');
        if (param1) {
            this.idcliente = +param1;
        }

        console.log(this.idbanco);
        console.log(this.idcliente);

        this.clienteService.getCliente(this.idcliente).subscribe({
            next: cliente => this.cliente = cliente,
            error: err => this.mensajeError = err
        });

        this.cajeroService.getCajero(this.idbanco).subscribe({
            next: cajero => this.cajero = cajero,
            error: err => this.mensajeError = err
        });
        this.operacionService.getOperacions().subscribe({
            next: operaciones => this.operacions = operaciones,
            error: err => this.mensajeError = err
        });




    }

    displayCuenta(cuenta: Cuenta): void {
        if (this.myform) {
            this.myform.reset();
        }
        this.cuenta = cuenta;
        console.log("en el display : " + this.cuenta.estado);
        
        this.myform.patchValue({
            idCuenta: this.cuenta.idCuenta,
            titular: this.cuenta.titular,
            saldo: this.cuenta.saldo,
            estado: this.cuenta.estado,
            tipo: this.cuenta.tipo,
            cliente: { idCliente: this.idcliente },
            sucursal: { idSucursal: 1 }
        });


    }

    

    createFormControlsCuenta() {
        this.idCuenta = new FormControl('');
        this.titular = new FormControl('', Validators.required);
        this.saldo = new FormControl('', Validators.required);
        this.estado = new FormControl('', [
            Validators.required
        ]);
        this.tipo = new FormControl('', [
            Validators.required
        ]);
        this.idCliente = new FormControl(this.idcliente, Validators.required);
        this.idSucursal = new FormControl(1, Validators.required);
    }



    createFormCuenta() {
        this.myform = new FormGroup({
            idCuenta: this.idCuenta,
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

    createFormControlsOperacion() {
        this.momentoActual = new Date()
        var hora = this.momentoActual.getHours()
        var minuto = this.momentoActual.getMinutes()
        var segundo = this.momentoActual.getSeconds()
        var dia = this.momentoActual.getDate();
        var mes = this.momentoActual.getMonth();
        var año = this.momentoActual.getFullYear();
        this.fechaImpresa = dia + "/" + mes + "/" + año
        this.horaImpresa = hora + ":" + minuto + ":" + segundo;
        this.nombre = new FormControl(`${this.nombreOperacion}`, Validators.required);
        this.fecha = new FormControl(`${this.fechaImpresa}`, Validators.required);
        this.hora = new FormControl(`${this.horaImpresa}`, Validators.required);
        this.idCuenta = new FormControl(this.idcuenta, Validators.required);
        this.idCajero = new FormControl(this.idbanco, Validators.required);
    }


    createFormOperacion() {
        this.operacionForm = new FormGroup({
            nombre: this.nombre,
            fecha: this.fecha,
            hora: this.hora,
            cuenta: new FormGroup({
                idCuenta: this.idCuenta
            }),
            cajero: new FormGroup({
                idCajero: this.idCajero
            })
        });
    }

    navegar() {
        this.router.navigate([`/banco/${this.idbanco}/cliente/${this.idcliente}/0`])
    }

    open(content, id, nombreOperacion) {
        this.nombreOperacion = nombreOperacion;
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        this.idcuenta = id;
        this.createFormControlsOperacion();
        this.createFormOperacion();
        this.createFormControlsCuenta();
        this.createFormCuenta();
        this.cuentaService.getCuenta(this.idcuenta).subscribe({
            next: (cuenta: Cuenta) => this.displayCuenta(cuenta),
            error: err => this.mensajeError = err
        });
        console.log("oeeeeeeeeeee" + this.myform.value);

    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }


    submitModal(nombre) {
        console.log('enviado');
        this.nombreOperacion = nombre;
        console.log(this.nombreOperacion);
        if (this.nombreOperacion === "consignacion" || this.nombreOperacion === "retirar") {

            console.log("en el service");

            const p = { ...this.operacion, ...this.operacionForm.value }
            this.operacionService.createOperacion(p).subscribe({
                next: () => this.modalService.dismissAll(),
                error: err => this.mensajeError = err
            });

        }
        if (this.nombreOperacion === "consignacion") {
            this.dineroConsignar;
            const p = {...this.cuentaAdd, ...this.myform.value}        
            
            this.cuentaService.consignarCuenta(p, this.dineroConsignar).subscribe({
                next: () => window.location.reload(),
                error: err => this.mensajeError = err
            });

        }
        if (this.nombreOperacion === "retirar") {
            this.dineroRetirar;
            const p = {...this.cuentaAdd, ...this.myform.value}
            this.cuentaService.retirarCuenta(p, this.dineroRetirar).subscribe({
                next: () => window.location.reload(),
                error: err => this.mensajeError = err
            });

        }

        if(this.nombreOperacion === 'Activada'){
            const p = {...this.cuentaAdd, ...this.myform.value}
            console.log(p);
            
            this.cuentaService.desactivarCuenta(p, this.nombreOperacion).subscribe({
                next: () => window.location.reload(),
                error: err => this.mensajeError = err
            });
        }

        if(this.nombreOperacion === 'Desactivada'){
            const p = {...this.cuentaAdd, ...this.myform.value}
            this.cuentaService.desactivarCuenta(p, this.nombreOperacion).subscribe({
                next: () => window.location.reload(),
                error: err => this.mensajeError = err
            });
        }


        this.modalService.dismissAll();

    }

    onSaveComplete(): void {
        this.myform.reset();
        this.router.navigate([`/banco/${this.idbanco}/cliente/${this.idcliente}`]);
    }

    // modificar(id,estado) {  
    //     if(estado === "Activada"){

    //         const p = {...this.cuentaAdd, ...this.myform.value}
    //         console.log(p);
            
    //         this.cuentaService.desactivarCuenta(p, "Desactivada").subscribe({
    //             next: () => window.location.reload(),
    //             error: err => this.mensajeError = err
    //         });
    //     }else {
    //         const p = {...this.cuentaAdd, ...this.myform.value}
    //         this.cuentaService.desactivarCuenta(p, "Activada").subscribe({
    //             next: () => window.location.reload(),
    //             error: err => this.mensajeError = err
    //         });
    //     }
    // }

    atras() {
        this.router.navigate([`/banco`])
    }


}