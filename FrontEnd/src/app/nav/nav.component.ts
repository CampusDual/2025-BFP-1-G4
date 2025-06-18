import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  usuario: string = '';
  username: string | null = null;
  constructor(public router: Router) {};
  

  ngOnInit(): void {
    this.usuario = sessionStorage.getItem('email') || '';
    this.username = sessionStorage.getItem('username');
  }

   irAListaOfertas() {
    this.router.navigate(['/lista-ofertas']);
  }

  irAPublicarOferta() {
  this.router.navigate(['/publicar-oferta']);
}
}
