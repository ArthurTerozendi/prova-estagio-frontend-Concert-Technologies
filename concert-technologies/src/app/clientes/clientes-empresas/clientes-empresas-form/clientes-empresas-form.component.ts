import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { ClientesDropdownService } from '../../clientes-dropdown.service';
import { Cidades } from '../cidades';
import { map, switchMap, tap } from 'rxjs/operators';
import { ClientesEmpresasService } from '../clientes-empresas.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../../shared/alert-modal/alert-modal.component';
import { Estados } from '../estados';

@Component({
  selector: 'app-clientes-empresas-form',
  templateUrl: './clientes-empresas-form.component.html',
  styleUrls: ['./clientes-empresas-form.component.sass']
})
export class ClientesEmpresasFormComponent implements OnInit {
  carregado: boolean = false;
  form: FormGroup;
  cidades: Cidades[];
  estados: Estados[];
  estados$: Observable<Estados[]>;
  cidades$: Observable<Cidades[]>;
  atualizado: boolean;
  bsModalRef: BsModalRef

  constructor(
    private formBuilder: FormBuilder,
    private clietesDropdown: ClientesDropdownService,
    private clienteServices: ClientesEmpresasService,
    private router: Router,
    private route: ActivatedRoute,
    private bsModalService : BsModalService
  ) { }

  ngOnInit(): void {
    //Timer para a execução do Spinner Loading
    setTimeout(() => {
      this.carregado = true;
    }, 1200);

    //Instancia o formulário
    this.form = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.required],
      cnpj: [null, Validators.required],
      telefone: [null],
      cep: [null, Validators.required],
      rua: [null, Validators.required],
      bairro: [null, Validators.required],
      cidade: [null, Validators.required],
      estado: [null, Validators.required],
    });


    //Pega todos os estados e preenche o campo do select
    this.clietesDropdown.getEstados()
      .subscribe(dados => {
        this.estados = dados;
      });

    //Se na URL tiver o valor do ID, preencherá o formulário com as informção do cadastro que tem o ID
    if (this.route.snapshot.params.id != null) {
      this.route.params.pipe(
        map(params => params.id),
        switchMap(id => this.clienteServices.carregarComId(id))
      ).subscribe(empresa => this.atualizarForm(empresa));
    }

    //Pega o estado selecionado e preenche o select das cidades com todas as cidades daquele estado
    this.form.get('estado').valueChanges
      .pipe(
        tap(estado => console.log),
        map(estado => this.estados.filter(e => e.sigla === estado)),
        map(estados => estados && estados.length > 0 ? estados[0].id : null),
        switchMap((estadoId: number) => this.clietesDropdown.getCidades(estadoId))
      )
      .subscribe(cidades => this.cidades = cidades);
  }
  
  /**
   * Atualiza os campos do formulário
   * @param pessoa 
   */
  atualizarForm(empresa) {
    this.form.patchValue({
      id: empresa.id,
      nome: empresa.nome,
      cnpj: empresa.cnpj,
      telefone: empresa.telefone,
      cep: empresa.cep,
      rua: empresa.rua,
      bairro: empresa.bairro,
      estado: empresa.estado,
      cidade: empresa.cidade,
    });
  }

  /**
   * Verifica se o formulário é valido
   * se for, verifica se a rota tem ID, se tiver chama o método update, se não tiver chama o método de adcionar
   * se não for válido, marcará todos os campos que ainda estão inválidos 
   * @param form 
   */
  onSubmit() {

    if (this.form.valid) {
      if (!this.form.value.id) {
        this.clienteServices.adcionar(this.form.value).subscribe(
          sucesso => {
            this.mostrarMsg('success', 'Empresa cadastrada com sucesso!')
            this.router.navigate(['/clientes/empresas']);
          },
          error => this.mostrarMsg('danger', 'Não foi possível cadastrar essa empresa, tente novamente!')
        );
      }
      else {
        this.clienteServices.update(this.form.value).subscribe(
          success => {
            this.mostrarMsg('success', 'Cadastro editado com sucesso!')
            this.router.navigate(['/clientes/empresas']);
          },
          error => this.mostrarMsg('danger', 'Não foi possível editar o cadastro dessa empresa, tente novamente!')
        )
      }
    } else {

      this.form.markAllAsTouched();
    }
  }

  /**
   * Reseta os campos do formulário
   * @param form 
   */
  onResetar() {
    this.form.reset();
  }

  /**
   * Retorna para a lista de empresas
   * @param form 
   */
  onCancelar() {
    if (!this.form.value.id) {
      this.router.navigate(['/clientes/empresas']);
    } else {
      this.router.navigate(['/clientes/empresas']);
    }
  }

  /**
   * Verifica se no campo há erros
   * @param campo 
   */
  hasError(campo: string) {
    return this.form.get(campo).errors;
  }

  /**
   * Verifica se o campo foi tocado
   * @param campo 
   */
  hasTouched(campo: string) {
    return this.form.get(campo).touched;
  }

  /**
   * Verifica se o campo é válido
   * @param campo
   */
  hasValid(campo: string) {
    return this.form.get(campo).valid;
  }

  /**
   * Aplicará o CSS de acordo com a validez dos campos
   * @param campo 
   */
  aplicaCss(campo) {
    if (this.hasTouched(campo) && this.hasError(campo)) {
      return 'is-invalid';
    } else if (this.hasValid(campo) && !this.hasError(campo)) {
      return 'is-valid';
    }
  }

  /**
   * Mostrará uma modal com a mensagem e com o estilo passado pelo tipo
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
