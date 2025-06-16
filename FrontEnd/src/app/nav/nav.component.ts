import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  usuario: string = '';
  username: string | null = null;

  ngOnInit(): void {
    this.usuario = sessionStorage.getItem('email') || '';
    this.username = sessionStorage.getItem('username');
  }

}
