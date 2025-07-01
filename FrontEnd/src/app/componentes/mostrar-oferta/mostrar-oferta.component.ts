import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../../services/ofertas-service.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-mostrar-oferta',
  templateUrl: './mostrar-oferta.component.html',
  styleUrls: ['./mostrar-oferta.component.css']
})
export class MostrarOfertaComponent implements OnInit {
offerActivas: any[] = [];

 constructor(private ofertasService: OfertasService, private authService: AuthService) {}

  ngOnInit(): void {
    this.ofertasService.getAllActiveOffers().subscribe(ofertas =>{
        this.offerActivas = ofertas;
    });
  }

aplicarOferta(oferta: any): void {
  const username = this.authService.getUsername(); // o getUserId() si lo tienes

  if (!username) {
    alert('⚠️ Debes iniciar sesión para postularte.');
    return;
  }

  this.ofertasService.checkInscription(username, oferta.id).subscribe({
    next: (isInscrito: boolean) => {
      if (isInscrito) {
        alert('ℹ️ Ya estás inscrito en esta oferta.');
      } else {
        this.ofertasService.inscribirse(oferta.id).subscribe({
          next: () => alert(`✅ Te has postulado a la oferta: ${oferta.title}`),
          error: () => alert('❌ Error al postularte.')
        });
      }
    },
    error: () => {
      alert('❌ Error al verificar inscripción.');
    }
  });
}


}
