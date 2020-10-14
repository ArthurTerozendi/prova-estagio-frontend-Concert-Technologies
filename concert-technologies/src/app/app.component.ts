import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'concert-technologies';

  carregado : boolean = false;

  ngOnInit(){
    //timer para a execução do Spinner Loading
    setTimeout(() => {
      this.carregado = true;
    }, 1000);
  }
}
