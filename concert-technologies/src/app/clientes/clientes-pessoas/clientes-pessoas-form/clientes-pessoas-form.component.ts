import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ClientesDropdownService } from '../../clientes-dropdown.service';
import { AlertModalComponent } from '../../shared/alert-modal/alert-modal.component';
import { ClientesPessoasService } from '../clientes-pessoas.service';
import { Paises } from '../paises';
import { Pessoa } from '../pessoa';

@Component({
  selector: 'app-clientes-pessoas-form',
  templateUrl: './clientes-pessoas-form.component.html',
  styleUrls: ['./clientes-pessoas-form.component.sass']
})
export class ClientesPessoasFormComponent implements OnInit {

  carregado: boolean = false;
  paises$: Observable<Paises[]>;
  linguagemProg: string = "";
  bsModalRef: BsModalRef;

  pessoa: Pessoa = {
    id: null,
    nome: null,
    email: null,
    dataNascimento: null,
    estadoCivil: 'solteira',
    nacionalidade: null,
    linguagemProg: {
      csharp: null,
      java: null,
      javascript: null,
      outro: null,
      php: null,
      python: null,
    }
  };

  constructor(
    private dropdownService: ClientesDropdownService,
    private clientesService: ClientesPessoasService,
    private route: ActivatedRoute,
    private router: Router,
    private bsModalService : BsModalService
  ) { }

  ngOnInit(): void {
    //Timer para a execução do Spinner Loading
    setTimeout(() => {
      this.carregado = true;
    }, 1200);

    //Pega todos os paises do paises.json
    this.paises$ = this.dropdownService.getPaises();
    
    //Se na URL tiver o valor do ID, preencherá o formulário com as informção do cadastro que tem o ID 
    if (this.route.snapshot.params.id != null) {
      this.route.params.pipe(
        map(params => params.id),
        switchMap(id => this.clientesService.carregarComId(id))
      ).subscribe(pessoa => this.atualizarForm(pessoa));
    }
  }
  /**
   * Atualiza os campos do formulário
   * @param pessoa 
   */
  atualizarForm(pessoa) {
    this.pessoa = {
      id: pessoa.id,
      nome: pessoa.nome,
      email: pessoa.email,
      dataNascimento: pessoa.dataNascimento,
      estadoCivil: pessoa.estadoCivil,
      nacionalidade: pessoa.nacionalidade,
      linguagemProg: {
        csharp: pessoa.linguagemProg.csharp,
        java: pessoa.linguagemProg.java,
        javascript: pessoa.linguagemProg.javascript,
        outro: pessoa.linguagemProg.outro,
        php: pessoa.linguagemProg.php,
        python: pessoa.linguagemProg.python
      }
    };
  }

  /**
   * Verifica se o formulário é valido
   * se for, verifica se a rota tem ID, se tiver chama o método update, se não tiver chama o método de adcionar
   * se não for válido, marcará todos os campos que ainda estão inválidos 
   * @param form 
   */
  onSubmit(form) {
    if (form.valid) {
      if (this.route.snapshot.params.id != null) {
        this.clientesService.update(this.pessoa).subscribe(
          success => {
              this.mostrarMsg('success', "Cadastro editado com sucesso!");
            this.router.navigate(['/clientes/pessoas']);
          },
          error => this.mostrarMsg('danger', "Não foi possível editar o cadastro dessa pessoa, tente novamente!")
        )
      } else {
        this.clientesService.adcionar(this.pessoa).subscribe(
          sucesso => {
            this.mostrarMsg('success', "Pessoa cadastrada com sucesso!");
            this.router.navigate(['/clientes/pessoas']);
          },
          error => this.mostrarMsg('danger', "Não foi possível cadastrar essa pessoa, tente novamente!")
        );
      }
    }
    let campos = form.form.controls;
    campos.dataNascimento.touched = true;
    campos.nome.touched = true;
    campos.email.touched = true;
    campos.nacionalidade.touched = true;
  }

  /**
   * Reseta os campos do formulário
   * @param form 
   */
  onResetar(form) {
    form.reset();
  }

  /**
   * Retorna para a lista de pessoas
   * @param form 
   */
  onCancelar(form) {
    this.router.navigate(['/clientes/pessoas']);
  }

  /**
   * Verifica se no campo há erros
   * @param campo 
   */
  hasError(campo) {
    return campo.errors;
  }
 
  /**
   * Verifica se o campo foi tocado
   * @param campo 
   */
  hasTouched(campo) {
    return campo.touched;
  }

  /**
   * Verifica se o campo é válido
   * @param campo
   */
  hasValid(campo) {
    return campo.valid;
  }

  /**
   * Aplicará o CSS de acordo com a validez dos campos
   * @param campo 
   */
  aplicaCss(campo) {
    if (this.hasTouched(campo) && this.hasError(campo) && !this.hasValid(campo)) {
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
