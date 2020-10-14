import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, pairs } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ClientesDropdownService } from '../clientes-dropdown.service';
import { AlertModalComponent } from '../shared/alert-modal/alert-modal.component';
import { ClientesPessoasService } from './clientes-pessoas.service';
import { Paises } from './paises';
import { Pessoa } from './pessoa';

@Component({
  selector: 'app-clientes-pessoas',
  templateUrl: './clientes-pessoas.component.html',
  styleUrls: ['./clientes-pessoas.component.sass'],
  preserveWhitespaces: true
})
export class ClientesPessoasComponent implements OnInit, OnDestroy {

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
    private dropdownService: ClientesDropdownService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.carregado = true;
    }, 1200);
    this.onRefresh();
    this.formatarData();

  }

  onRefresh() {
    this.pessoas$ = this.clientesService.listar();
  }


  onEditar(id) {
    this.router.navigate(['../editar', id], { relativeTo: this.route });
  }

  onDeletar(id) {
    this.idPessoaSelecionada = id;
    this.bsModalRef = this.bsModalService.show(this.deletarModal);
  }

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

  mostrarMsg(tipo, msg) {
    this.bsModalRef = this.bsModalService.show(AlertModalComponent);
    this.bsModalRef.content.tipo = tipo;
    this.bsModalRef.content.mensagem = msg;
    setTimeout(() => {
      this.bsModalService.hide();
    }, 2000);
  }

  cancelar() {
    this.bsModalRef.hide();
  }

  formatarData() {
    this.pessoas$.subscribe(
      dados => {
        for (const pessoa of dados) {
          let dataArray = pessoa.dataNascimento.split("-");
          pessoa.dataNascimento = dataArray[2] + "/" + dataArray[1] + "/" + dataArray[0];
          console.log(pessoa.dataNascimento);
        }
        this.pessoas = dados;
      }
    )
  }
}
