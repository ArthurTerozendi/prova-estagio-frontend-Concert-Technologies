import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.sass']
})
export class AlertModalComponent implements OnInit {

  @Input() mensagem : string;
  @Input() tipo;

  constructor(
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
  }
  fechar() {
    this.bsModalRef.hide();
  }
}
