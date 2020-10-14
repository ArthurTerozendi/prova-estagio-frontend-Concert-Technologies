import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ClientesDropdownService } from '../../clientes-dropdown.service';
import { ClientesPessoasService } from '../clientes-pessoas.service';
import { Paises } from '../paises';
import { Pessoa } from '../pessoa';

@Component({
  selector: 'app-clientes-pessoas-form',
  templateUrl: './clientes-pessoas-form.component.html',
  styleUrls: ['./clientes-pessoas-form.component.sass']
})
export class ClientesPessoasFormComponent implements OnInit {

  carregado : boolean = false;
  paises$ : Observable<Paises[]>;
  linguagemProg : string = "";

  pessoa : Pessoa = {
    id: null,
    nome: null,
    email: null,
    dataNascimento: null,
    estadoCivil: null,
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
    private dropdownService : ClientesDropdownService,
    private clientesService : ClientesPessoasService,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.carregado = true;
    }, 1200);

    this.paises$ = this.dropdownService.getPaises();

    this.route.params.pipe(
      map(params => params.id),
      switchMap(id => this.clientesService.carregarComId(id))
    ).subscribe(pessoa =>this.atualizarForm(pessoa));
  }

  formatarCheckBox(linguagens) {
    if(linguagens.csharp.value == true){
      linguagens.csharp = 'csharp'
    }
    if(linguagens.java.value == true){
      linguagens.java = 'java'
    }
    if(linguagens.javascript.value == true){
      linguagens.javascript = 'javascript'
    }
    if(linguagens.php.value == true){
      linguagens.php = 'php'
    }
    if(linguagens.outro.value == true){
      linguagens.outro = 'outro'
    }
    if(linguagens.python.value == true){
      linguagens.python = 'python'
    }

    return linguagens;
  }
  atualizarForm(pessoa) {
    console.log(pessoa.linguagemProg);

    let linguagens = this.formatarCheckBox(pessoa.linguagemProg);
    console.log(linguagens);
    this.pessoa = {
      id: pessoa.id,
      nome: pessoa.nome,
      email: pessoa.email,
      dataNascimento: pessoa.dataNascimento,
      estadoCivil: pessoa.estadoCivil,
      nacionalidade: "Brasil",
      linguagemProg: {
        csharp: linguagens.csharp,
        java: linguagens.java,
        javascript: linguagens.javascript,
        outro: linguagens.outro,
        php: linguagens.php,
        python: linguagens.python
    }
    };
  }

  onSubmit(form) {
    console.log(this.pessoa);
    console.log(form.value);
    if (!form.value.id) {
      this.clientesService.adcionar(this.pessoa).subscribe(
        sucesso => {
          this.router.navigate(['/clientes/pessoas']);
        }
      );
    }
    else {
      //this.clientesService.update(form.value).subscribe(
        //sucesso => {
          //console.log('sucesso');
          //this.router.navigate(['/clientes/empresas']);
        //},
      //)
      console.log(form.value);
    }
  }

  hasError(campo: string, form) {
    return form.get(campo).errors;
  }

  hasTouched(campo: string, form) {
    return form.get(campo).touched;
  }

  hasValid(campo: string, form) {
    return form.get(campo).valid;
  }

  aplicaCss(campo, form) {
    if (this.hasTouched(campo, form) && this.hasError(campo, form)) {
      return 'is-invalid';
    } else if (this.hasValid(campo, form) && !this.hasError(campo, form)) {
      return 'is-valid';
    }
  }
}
