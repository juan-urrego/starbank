import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../models/cliente';
import { Persona } from '../models/persona';
import { Empresa } from '../models/empresa';
import { PersonaService } from '../services/persona.service';
import { ClienteService } from '../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaService } from '../services/empresa.service';

@Component({

    templateUrl: 'cliente-agregar.component.html'
})

export class ClienteAgregarComponent implements OnInit {
    myform: FormGroup;
    personaForm: FormGroup;
    empresaForm: FormGroup;

    //persona
    // idPersona: FormControl;
    // direccion: FormControl;
  
    //empresa
    // idEmpresa: FormControl;
    // nit: FormControl;
    // nombreEmpresa: FormControl;
    // sector: FormControl;
    // direccionEmpresa:FormControl;

    //cliente
    IdCliente: FormControl;
    nombre: FormControl;
    ocupacion: FormControl;
    telefono: FormControl;

    mensajeError = '';
    cliente: Cliente;
    cliente1: Cliente;
    persona: Persona;
    empresa: Empresa;
    verificacion = false;
    tipo: string;
    tipo1: string;
    nombre1: string;

    


    constructor(private modalService: NgbModal,
        private router: Router,
        private route: ActivatedRoute,
        private clienteService: ClienteService,
        private personaService: PersonaService,
        private empresaService: EmpresaService, ) {

    }

    createFormControlsCliente() {
        this.IdCliente = new FormControl(0, Validators.required);
        this.nombre = new FormControl("", Validators.required);
        this.ocupacion = new FormControl("", [
            Validators.required
        ]);
        this.telefono = new FormControl("", [
            Validators.required
        ]);
    }

    createFormCliente() {
        this.myform = new FormGroup({
            IdCliente: this.IdCliente,
            nombre: this.nombre,
            ocupacion: this.ocupacion,
            telefono: this.telefono
        });
    }
    // createFormControlsPersona() {
    //     this.idPersona = new FormControl(0, Validators.required);
    //     this.direccion = new FormControl("", Validators.required);        
    // }

    // createFormPersona() {
    //     this.personaForm = new FormGroup({
    //         idPersona: this.idPersona,
    //         direccion: this.direccion,
    //         cliente: new FormGroup({
    //             idCliente: this.IdCliente
    //         })
    //     });
    // }
    // createFormControlsEmpresa() {
    //     this.idEmpresa = new FormControl(0, Validators.required);
    //     this.nit = new FormControl("", Validators.required);
    //     this.nombreEmpresa = new FormControl("", Validators.required);
    //     this.sector = new FormControl("", Validators.required);
    //     this.direccionEmpresa = new FormControl("", Validators.required);
        
    // }

    // createFormEmpresa() {
    //     this.empresaForm = new FormGroup({
    //         idEmpresa: this.idEmpresa,
    //         nit: this.nit,
    //         nombreEmpresa: this.nombreEmpresa,
    //         sector: this.sector,
    //         direccionEmpresa: this.direccionEmpresa,
    //         cliente: new FormGroup({
    //             idCliente: this.IdCliente
    //         })
    //     });
    // }

    ngOnInit() {
        this.createFormControlsCliente();
        this.createFormCliente();

    }

    onSaveComplete(): void {
        this.myform.reset();
        this.router.navigate([`/banco`]);;
    }

    onSubmit() {
        this.verificacion = true;
        console.log("en el boton");

        if (this.myform.valid) {
            if (this.myform.dirty) {
                const p = { ...this.cliente, ...this.myform.value };


                this.clienteService.createCliente(p)
                    .subscribe({
                        next: (cliente: Cliente) => this.cliente= cliente,
                        error: err => this.mensajeError = err
                    });
            }
        } else {
            this.onSaveComplete();
        }
        
    
    }

    personaSubmit(){
        if (this.personaForm.valid) {
            if (this.personaForm.dirty) {
                const p = { ...this.persona, ...this.personaForm.value };


                this.personaService.createPersona(p)
                    .subscribe({
                        next: () => this.onSaveComplete(),
                        error: err => this.mensajeError = err
                    });
            }
        } else {
            this.onSaveComplete();
        }
    }
    empresaSubmit(){
        if (this.empresaForm.valid) {
            if (this.empresaForm.dirty) {
                const p = { ...this.empresa, ...this.empresaForm.value };


                this.empresaService.createEmpresa(p)
                    .subscribe({
                        next: () => this.onSaveComplete(),
                        error: err => this.mensajeError = err
                    });
            }
        } else {
            this.onSaveComplete();
        }
    }

    enviar(){

        this.clienteService.getClienteNombre(this.nombre1).subscribe({
            next: cliente => {
                this.cliente1 = cliente;
                ;                
            },
            error: err => this.mensajeError = err
        });

        console.log(this.cliente1);
        this.tipo1 = this.tipo;

        if(this.tipo1 === "persona"){
            let idPersona: FormControl;
            let direccion: FormControl;
            let idCliente: FormControl;

            console.log("en el display");
            
    
            idPersona = new FormControl(0, Validators.required);
            direccion = new FormControl("", Validators.required);
            
            this.personaForm = new FormGroup({
                idPersona: idPersona,
                direccion: direccion
  
            });
        }else {
            let idEmpresa: FormControl;
            let nit: FormControl;
            let nombre: FormControl;
            let sector: FormControl;
            let direccion:FormControl;
            let idCliente: FormControl;
            idEmpresa = new FormControl(0, Validators.required);
            nit = new FormControl("", Validators.required);
            nombre = new FormControl("", Validators.required);
            sector = new FormControl("", Validators.required);
            direccion = new FormControl("", Validators.required);
           
            
            this.empresaForm = new FormGroup({
                idEmpresa: idEmpresa,
                nit: nit,
                nombre: nombre,
                sector: sector,
                direccion: direccion
            });
        }
    }
}