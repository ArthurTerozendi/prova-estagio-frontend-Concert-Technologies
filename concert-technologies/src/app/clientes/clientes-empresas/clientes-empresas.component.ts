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
    //Timer para a excução do Spinner Loading
    setTimeout(() => {
      this.carregado = true;
    }, 1000);
    //Timer para a excução do Spinner Loading
    //Carrega as informações da lista
    this.onRefresh();

  }

  /**
   * Método que carregará a pagina com as informações do JSON-server
   */
  onRefresh() {
    this.empresas$ = this.clientesService.listar();
  }

  /**
   * Pegará as informações do formulário e encaminhará elas e o usuario para a pagina de edição de cadastro
   * @param id 
   */
  onEditar(id) {
    this.router.navigate(['../editar', id], { relativeTo: this.route });
  }

  /**
   * Deletará o cadastro com o ID passado por parâmetro
   * @param id 
   */
  onDeletar(id) {
    this.idEmpresaSelecionada = id;
    this.bsModalRef = this.bsModalService.show(this.deletarModal, { class: 'modal-sm' });
  }

  /**
   * Abri um modal para confirmar a escolha do usuário
   * Se ele quiser continuar chama o método deletar do ClientePessoaService
   */
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
  /**
   * Fecha a modal
   */
  cancelar() {
    this.bsModalService.hide();
  }
  /**
   * Mostrará a modal com a mensagem passada por parametro e com o tipo (se é success ou danger)
   * @param tipo 
   * @param msg 
   */
  mostrarMsg(tipo, msg) {
    this.bsModalRef = this.bsModalService.show(AlertModalComponent);
    this.bsModalRef.content.tipo = tipo;
    this.bsModalRef.content.mensagem = msg;
    setTimeout(() => {
      this.bsModalService.hide();
    }, 2000);
  }

}
