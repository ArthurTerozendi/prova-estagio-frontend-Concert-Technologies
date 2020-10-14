import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { AlertModalComponent } from '../shared/alert-modal/alert-modal.component';
import { ClientesPessoasService } from './clientes-pessoas.service';
import { Pessoa } from './pessoa';

@Component({
  selector: 'app-clientes-pessoas',
  templateUrl: './clientes-pessoas.component.html',
  styleUrls: ['./clientes-pessoas.component.sass'],
  preserveWhitespaces: true
})
export class ClientesPessoasComponent implements OnInit {

  carregado: boolean = false;
  pessoas: Pessoa[];
  pessoas$: Observable<Pessoa[]>;
  bsModalRef: BsModalRef;
  idPessoaSelecionada;
  @ViewChild('deletarModal') deletarModal;

  constructor(
    private clientesService: ClientesPessoasService,
    private router: Router,
    private route: ActivatedRoute,
    private bsModalService: BsModalService,
  ) { }

  ngOnInit(): void {
    //Timer para a excução do Spinner Loading
    setTimeout(() => {
      this.carregado = true;
    }, 1200);
    //Carrega as informações da lista
    this.onRefresh();
    //Formata a data
    this.formatarData();

  }

  /**
   * Método que carregará a pagina com as informações do JSON-server
   */
  onRefresh() {
    this.pessoas$ = this.clientesService.listar();
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
    this.idPessoaSelecionada = id;
    this.bsModalRef = this.bsModalService.show(this.deletarModal);
  }

  /**
   * Abri um modal para confirmar a escolha do usuário
   * Se ele quiser continuar chama o método deletar do ClientePessoaService
   */
  confirmar() {
    this.clientesService.deletar(this.idPessoaSelecionada).subscribe(
      () => {
        this.mostrarMsg('success', 'Pessoa removida com sucesso');
        this.onRefresh();
      },
      error => this.mostrarMsg('error', 'Não foi possível remover a pessoa, tente novamente')
    );
    this.bsModalRef.hide();

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

  /**
   * Fecha a modal
   */
  cancelar() {
    this.bsModalRef.hide();
  }

  /**
   * Pega a data em formato aaaa-MM-dd, e a inverte
   * transformando em dd-MM-aaaa
   */
  formatarData() {
    this.pessoas$.subscribe(
      dados => {
        for (const pessoa of dados) {
          let dataArray = pessoa.dataNascimento.split("-");
          pessoa.dataNascimento = dataArray[2] + "/" + dataArray[1] + "/" + dataArray[0];
        }
        this.pessoas = dados;
      }
    )
  }
}
