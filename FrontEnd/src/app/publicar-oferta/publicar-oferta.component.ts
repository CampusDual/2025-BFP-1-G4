import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-publicar-oferta',
  templateUrl: './publicar-oferta.component.html',
  styleUrls: ['./publicar-oferta.component.css']
})
export class PublicarOfertaComponent implements OnInit {
  publicar: FormGroup = this.fb.group({}); 
  nombreEmpresa: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.publicar = this.fb.group({
      oferta: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
    this.nombreEmpresa = this.authService.getNombreEmpresa();
  }

  onSubmit() {
    if (this.publicar.valid) {
      // Lógica para publicar la oferta
    }
  }
}