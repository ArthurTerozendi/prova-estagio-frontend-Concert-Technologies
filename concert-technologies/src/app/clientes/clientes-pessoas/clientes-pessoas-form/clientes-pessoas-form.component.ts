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

    setTimeout(() => {
      this.carregado = true;
    }, 1200);

    this.paises$ = this.dropdownService.getPaises();
    if (this.route.snapshot.params.id != null) {
      this.route.params.pipe(
        map(params => params.id),
        switchMap(id => this.clientesService.carregarComId(id))
      ).subscribe(pessoa => this.atualizarForm(pessoa));
    }
  }
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

  onResetar(form) {
    form.reset();
  }

  onCancelar(form) {
    if (this.route.snapshot.params.id != null){
      this.router.navigate(['/clientes/pessoas']);
    } else {
      this.router.navigate(['/clientes/pessoas']);
    }
  }

  hasError(campo) {
    return campo.errors;
  }

  hasTouched(campo) {
    return campo.touched;
  }

  hasValid(campo) {
    return campo.valid;
  }

  aplicaCss(campo) {
    if (this.hasTouched(campo) && this.hasError(campo) && !this.hasValid(campo)) {
      return 'is-invalid';
    } else if (this.hasValid(campo) && !this.hasError(campo)) {
      return 'is-valid';
    }
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
