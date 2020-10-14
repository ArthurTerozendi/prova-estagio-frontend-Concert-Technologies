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
    setTimeout(() => {
      this.carregado = true;
    }, 1200);
  }

  clicou() {
    console.log('clicou');
  }

}
