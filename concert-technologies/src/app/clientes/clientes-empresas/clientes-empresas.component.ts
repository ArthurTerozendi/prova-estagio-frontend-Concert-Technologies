import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Observable } from 'rxjs';
import { AlertModalComponent } from '../shared/alert-modal/alert-modal.component';
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
  bsModalRef: BsModalRef;
  idEmpresaSelecionada;
  @ViewChild('deletarModal') deletarModal;
  @ViewChild('sucessoModal') sucessoModal;

  constructor(
    private clientesService: ClientesEmpresasService,
    private router: Router,
    private route: ActivatedRoute,
    private bsModalService: BsModalService
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
    this.bsModalRef = this.bsModalService.show(this.deletarModal, { class: 'modal-sm' });
  }

  confirmar() {
    this.clientesService.deletar(this.idEmpresaSelecionada).subscribe(
      () => {
        this.mostrarMsg('success', 'Empresa deletada com sucesso!')
        this.onRefresh();
      },
      error => this.mostrarMsg('danger', 'Não foi possível deletar essa empresa, tente novamente!')
    );
    this.bsModalRef.hide();
    
  }

  cancelar() {
    this.bsModalService.hide();
  }

  mostrarMsg(tipo, msg) {
    this.bsModalRef = this.bsModalService.show(AlertModalComponent);
    this.bsModalRef.content.tipo = tipo;
    this.bsModalRef.content.mensagem = msg;
    setTimeout(() => {
      this.bsModalService.hide();
    }, 2000);
  }

}
