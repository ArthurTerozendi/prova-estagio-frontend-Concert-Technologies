import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Observable } from 'rxjs';
import { ClientesService } from '../clientes.service';
import { Empresas } from './empresas';

@Component({
  selector: 'app-clientes-empresas',
  templateUrl: './clientes-empresas.component.html',
  styleUrls: ['./clientes-empresas.component.sass'],
  preserveWhitespaces: true
})
export class ClientesEmpresasComponent implements OnInit {

  empresas$ : Observable<Empresas[]>;
  carregado : boolean = false;
  modalDeletarRef : BsModalRef;
  idCursoSelecionado;
  @ViewChild('deletarModal') deletarModal;

  constructor(
    private clientesService : ClientesService,
    private router : Router,
    private route : ActivatedRoute,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.carregado = true;
    }, 1000);

    this.onRefresh();

  }

  onRefresh() {
    this.empresas$ = this.clientesService.listar();
  }

  onEditar(id){
    this.router.navigate(['../editar', id], { relativeTo: this.route });
  }

  onDeletar(id){
    this.idCursoSelecionado = id;
    this.modalDeletarRef = this.modalService.show(this.deletarModal, {class: 'modal-sm'});
  }

  confirmar(){
    this.clientesService.deletar(this.idCursoSelecionado).subscribe(
      () => this.onRefresh(),
      error => console.error(error)
    );
    this.modalDeletarRef.hide();
  }

  cancelar(){
    this.modalDeletarRef.hide();
  }

}
