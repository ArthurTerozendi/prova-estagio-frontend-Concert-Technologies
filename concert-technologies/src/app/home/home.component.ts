import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  carregado : boolean = false

  constructor() { }

  ngOnInit(): void {
    //Timer para a execução do Spinner Loading
    setTimeout(() => {
      this.carregado = true;
    }, 1200);
  }
}
