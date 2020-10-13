import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { empty, Observable } from 'rxjs';
import { Estados } from '../../estados';
import { ClientesDropdownService } from '../../clientes-dropdown.service';
import { Cidades } from '../../cidades';
import { map, switchMap, tap } from 'rxjs/operators';
import { ClientesService } from '../../clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-clientes-empresas-form',
  templateUrl: './clientes-empresas-form.component.html',
  styleUrls: ['./clientes-empresas-form.component.sass']
})
export class ClientesEmpresasFormComponent implements OnInit {
  carregado: boolean = false;
  form: FormGroup;
  cidades: Cidades;
  estados: Estados[];
  estados$: Observable<Estados[]>;
  cidades$: Observable<Cidades[]>;
  atualizado: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private clietesDropdown: ClientesDropdownService,
    private clienteServices: ClientesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.carregado = true;
    }, 1200);

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



    this.clietesDropdown.getEstados()
      .subscribe(dados => {
        this.estados = dados;
      });

    this.form.get('estado').valueChanges
      .pipe(
        tap(estado => console.log),
        map(estado => this.estados.filter(e => e.sigla === estado)),
        map(estados => estados && estados.length > 0 ? estados[0].id : null),
        switchMap((estadoId: number) => this.clietesDropdown.getCidades(estadoId)),
        tap(console.log)
      )
      .subscribe(cidades => this.cidades = cidades);

    this.route.params.pipe(
      map(params => params.id),
      switchMap(id => this.clienteServices.carregarComId(id))
    ).subscribe(empresa => this.atualizarForm(empresa));
  }

  atualizarForm(empresa) {
    console.log(empresa);
    this.form.patchValue({
      id: empresa.id,
      nome: empresa.nome,
      cnpj: empresa.cnpj,
      telefone: empresa.telefone,
      cep: empresa.cep,
      rua: empresa.rua,
      bairro: empresa.bairro,
      cidade: empresa.cidade,
      estado: empresa.estado,
    });
  }

  onSubmit() {

    if (this.form.valid) {
      if (!this.form.value.id) {
        this.clienteServices.adcionar(this.form.value).subscribe(
          sucesso => {
            this.router.navigate(['/clientes/empresas']);
          }
        );
      }
      else {
        this.clienteServices.update(this.form.value).subscribe(
          sucesso => {
            console.log('sucesso');
            this.router.navigate(['/clientes/empresas']);
          },
        )
      }
    } else {
      const controle = this.form;
      controle.markAllAsTouched();
    }
  }

  onCancelar() {
    if(!this.form.value.id){
      this.form.reset();
    } else {
      this.router.navigate(['/clientes/empresas']);
    }
  }

  hasError(campo: string) {
    return this.form.get(campo).errors;
  }

  hasTouched(campo: string) {
    return this.form.get(campo).touched;
  }

  hasValid(campo: string) {
    return this.form.get(campo).valid;
  }

  aplicaCss(campo) {
    if (this.hasTouched(campo) && this.hasError(campo)) {
      return 'is-invalid';
    } else if (this.hasValid(campo) && !this.hasError(campo)) {
      return 'is-valid';
    }
  }

}
