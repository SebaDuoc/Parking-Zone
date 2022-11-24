import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApirestService } from '../apirest.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {

horas : number;  
datos : any;
  constructor(private api:ApirestService,
              private activatedRoute: ActivatedRoute) { }

       
  ngOnInit() {
    this.leer();
  }
  async leer()
  {
    let id = "";
    this.activatedRoute.paramMap.subscribe(async parametros => {
      id= parametros.get("id");
    })
    await this.api.getEstacionamiento(id);
    this.datos = this.api.item;
    console.log(this.datos);
  }
  async calcular()
  {
    let id = "";
    this.activatedRoute.paramMap.subscribe(async parametros => {
      id= parametros.get("id");
    })
    await this.api.getEstacionamiento(id);
    this.datos = this.api.item;

  }
}
