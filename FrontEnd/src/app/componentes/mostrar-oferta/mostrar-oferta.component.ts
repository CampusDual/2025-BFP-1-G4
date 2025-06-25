import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../../services/ofertas-service.service';

@Component({
  selector: 'app-mostrar-oferta',
  templateUrl: './mostrar-oferta.component.html',
  styleUrls: ['./mostrar-oferta.component.css']
})
export class MostrarOfertaComponent implements OnInit {
offerActivas: any[] = [];

  constructor(private ofertasService: OfertasService) {}

  ngOnInit(): void {
    this.ofertasService.getAllActiveOffers().subscribe(ofertas =>{
        this.offerActivas = ofertas;
    });
  }

 aplicarOferta(oferta: any): void {
    alert(`✅ Aplicaste a la oferta: ${oferta.title}`);
  }

}
