import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from '../services/register.service';

@Component({
  selector: 'app-registro',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {
  registroForm: FormGroup;
  loginGenerado: string = '';
  passwordGenerada: string = '';
  registroExitoso: boolean = false;

  constructor(private fb: FormBuilder, private registroService: RegistroService, private router: Router) {
    this.registroForm = this.fb.group({
      name: ['', Validators.required],
      surname1: ['', Validators.required],
      surname2: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  generarCredenciales(name: string, surname1: string) {
    this.loginGenerado = `${name.toLowerCase()}.${surname1.toLowerCase()}`.replace(/\s/g, '');
    this.passwordGenerada = Math.random().toString(36).slice(-8); // Contraseña aleatoria simple
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const datos = this.registroForm.value;
      this.generarCredenciales(datos.name, datos.surname1);

      const nuevoUsuario = {
        name: datos.name,
        surname1: datos.surname1,
        surname2: datos.surname2,
        phone: datos.phone,
        email: datos.email,
        login: this.loginGenerado,
        password: this.passwordGenerada
      };

      this.registroService.registrarUsuario(nuevoUsuario).subscribe({
        next: () => {
          this.registroExitoso = true;
        },
        error: (err) => {
          console.error('Error al registrar usuario:', err);
        }
      });
    }
  }
}
