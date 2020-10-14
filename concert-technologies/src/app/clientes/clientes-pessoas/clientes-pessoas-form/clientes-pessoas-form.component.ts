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
    console.log(this.route.snapshot.params.id != null);
    if(form.valid){
      if(this.route.snapshot.params.id != null){
        this.clientesService.update(this.pessoa).subscribe(
          sucesso => {
            console.log('sucesso');
            this.router.navigate(['/clientes/pessoas']);
          },
          error => console.error(error),
          () => console.log("upadate")
        )
      } else {
        this.clientesService.adcionar(this.pessoa).subscribe(
              sucesso => {
                this.router.navigate(['/clientes/pessoas']);
              }
            );
      }
    }
    // console.log(this.pessoa);
    // console.log(form.value);
    // if (!form.value.id) {
    //   this.clientesService.adcionar(this.pessoa).subscribe(
    //     sucesso => {
    //       this.router.navigate(['/clientes/pessoas']);
    //     }
    //   );
    // }
    // else {
      //this.clientesService.update(form.value).subscribe(
        //sucesso => {
          //console.log('sucesso');
          //this.router.navigate(['/clientes/empresas']);
        //},
      //)
    // }
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
}
