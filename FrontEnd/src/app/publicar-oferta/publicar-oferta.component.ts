import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Oferta } from '../model/oferta.model';
import { OfertasService } from '../services/ofertas-service.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-publicar-oferta',
  templateUrl: './publicar-oferta.component.html',
  styleUrls: ['./publicar-oferta.component.css']
})
export class PublicarOfertaComponent {
  oferta: Oferta = {
    title: '', description: '', publicationdate: new Date(), active: true
  };

  onSubmit() {
    throw new Error('Method not implemented.');
  }
  constructor(private ofertasService: OfertasService) { }


  publicarOferta() {
    this.ofertasService.crearOferta(this.oferta).subscribe({
      next: (data) => {
        alert('Oferta publicada con éxito');
      },
      error: (err) => {
        console.error('Error al publicar oferta', err);
      }
    });
  }

}
