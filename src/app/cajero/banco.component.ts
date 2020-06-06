import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { CajeroService } from '../services/cajero.service';
import { Cajero } from '../models/cajero';
import { Sucursal } from '../models/sucursal';
import { SucursalService } from '../services/sucursal.service';

@Component({
    templateUrl: 'banco.component.html'
})

export class BancoComponent implements OnInit {
    title="Bancos"
    closeResult = '';
    id : number;
    cajeros: Cajero[];
    cajeroSeleccionado: Cajero;
    mensajeError: string;
    sucursal: Sucursal;
    cedula: string;
    
    constructor(private modalService: NgbModal,
        private sucursalService: SucursalService,
        private router: Router,
        private route: ActivatedRoute,
        private cajeroService: CajeroService) { }

    ngOnInit() {
        this.cajeroService.getCajeros().subscribe({
            next: cajeros => {
                this.cajeros = cajeros;                
            },
            error: err => this.mensajeError = err
        });

        this.sucursalService.getSucursal(1).subscribe({
            next: sucursal => this.sucursal = sucursal,
            error: err => this.mensajeError = err
        });
     }

    open(content, id) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        this.id = id;
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


    submitModal(){       
        
        this.modalService.dismissAll();
        this.router.navigate([`/banco/${this.id}/cliente/${this.cedula}`])
    }

    navegar(){
        this.router.navigate([`/cliente`])
    }
}
