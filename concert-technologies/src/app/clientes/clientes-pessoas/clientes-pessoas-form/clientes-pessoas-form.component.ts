import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientesDropdownService } from '../../clientes-dropdown.service';
import { Paises } from '../paises';

@Component({
  selector: 'app-clientes-pessoas-form',
  templateUrl: './clientes-pessoas-form.component.html',
  styleUrls: ['./clientes-pessoas-form.component.sass']
})
export class ClientesPessoasFormComponent implements OnInit {

  carregado : boolean = false;
  paises$ : Observable<Paises[]>;

  constructor(
    private dropdownService : ClientesDropdownService
  ) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.carregado = true;
    }, 1200);

    this.paises$ = this.dropdownService.getPaises();

  }

}
