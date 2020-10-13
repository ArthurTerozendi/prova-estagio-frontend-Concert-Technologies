import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Observable } from 'rxjs';
import { ClientesEmpresasService } from './clientes-empresas.service';
import { Empresas } from './empresas';

@Component({
  selector: 'app-clientes-empresas',
  templateUrl: './clientes-empresas.component.html',
  styleUrls: ['./clientes-empresas.component.sass'],
  preserveWhitespaces: true
})
export class ClientesEmpresasComponent implements OnInit {

  empresas$: Observable<Empresas[]>;
  carregado: boolean = false;
  modalDeletarRef: BsModalRef;
  modalSucessoRef: BsModalRef;
  idEmpresaSelecionada;
  @ViewChild('deletarModal') deletarModal;
  @ViewChild('sucessoModal') sucessoModal;

  constructor(
    private clientesService: ClientesEmpresasService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.carregado = true;
    }, 1000);

    this.onRefresh();

  }

  onRefresh() {
    this.empresas$ = this.clientesService.listar();
  }

  onEditar(id) {
    this.router.navigate(['../editar', id], { relativeTo: this.route });
  }

  onDeletar(id) {
    this.idEmpresaSelecionada = id;
    this.modalDeletarRef = this.modalService.show(this.deletarModal, { class: 'modal-sm' });
  }

  confirmar() {
    this.clientesService.deletar(this.idEmpresaSelecionada).subscribe(
      () => {
        this.onRefresh();
        this.modalSucessoRef = this.modalService.show(this.sucessoModal, { class: 'modal-sm' });
      },
      error => console.error(error)
    );
    this.modalDeletarRef.hide();
    
  }

  fechar() {
    this.modalSucessoRef.hide();
  }

  cancelar() {
    this.modalDeletarRef.hide();
  }

}
