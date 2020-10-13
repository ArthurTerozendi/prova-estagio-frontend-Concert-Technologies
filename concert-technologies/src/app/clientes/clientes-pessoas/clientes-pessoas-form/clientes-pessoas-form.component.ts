import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientesDropdownService } from '../../clientes-dropdown.service';
import { ClientesPessoasService } from '../clientes-pessoas.service';
import { Paises } from '../paises';

@Component({
  selector: 'app-clientes-pessoas-form',
  templateUrl: './clientes-pessoas-form.component.html',
  styleUrls: ['./clientes-pessoas-form.component.sass']
})
export class ClientesPessoasFormComponent implements OnInit {

  carregado : boolean = false;
  paises$ : Observable<Paises[]>;
  linguagemProg : string = ""

  constructor(
    private dropdownService : ClientesDropdownService,
    private clientesService : ClientesPessoasService
  ) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.carregado = true;
    }, 1200);

    this.paises$ = this.dropdownService.getPaises();

  }

  concatenarCheckbox(form) {
    for (const campo in form.controls) {
        const control = form.controls[campo];
        if(control.value === true) {
          this.linguagemProg += campo+";"
        }
    }
  }

  onSubmit(form) {
    console.log(form.value);
    this.concatenarCheckbox(form);
    console.log(this.linguagemProg);
    this.clientesService.adcionar(form.value).subscribe(
      sucesso => {console.log("sucesso") }
    );
  }

}
