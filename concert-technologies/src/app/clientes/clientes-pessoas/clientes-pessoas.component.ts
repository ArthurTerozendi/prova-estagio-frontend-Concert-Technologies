import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
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
  pessoas$: Observable<Pessoa[]>;
  modalDeletarRef: BsModalRef;
  modalSucessoRef: BsModalRef;
  idPessoaSelecionada;
  @ViewChild('deletarModal') deletarModal;
  @ViewChild('sucessoModal') sucessoModal;

  constructor(
    private clientesService: ClientesPessoasService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.carregado = true;
    }, 1200);
    this.onRefresh();

  }

  onRefresh() {
    this.pessoas$ = this.clientesService.listar();
  }
  

  onEditar(id) {
    this.router.navigate(['../editar', id], { relativeTo: this.route });
  }

  onDeletar(id) {
    this.idPessoaSelecionada = id;
    this.modalDeletarRef = this.modalService.show(this.deletarModal, { class: 'modal-sm' });
  }

  confirmar() {
    this.clientesService.deletar(this.idPessoaSelecionada).subscribe(
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
