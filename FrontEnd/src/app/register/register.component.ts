import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from '../services/register.service';

registroForm: FormGroup;

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

  constructor(
  private fb: FormBuilder,
  private registroService: RegistroService,
  private router: Router
) {
  this.registroForm = this.fb.group({
    name: ['', Validators.required],
    surname1: ['', Validators.required],
    surname2: ['', Validators.required],
    phonenumber: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    login: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
}

  generarCredenciales(name: string, surname1: string) {
    this.loginGenerado = `${name.toLowerCase()}.${surname1.toLowerCase()}`.replace(/\s/g, '');
    this.passwordGenerada = Math.random().toString(36).slice(-8); // Contraseña aleatoria simple
  }

 onSubmit() {
  if (this.registroForm.valid) {
    const nuevoUsuario = this.registroForm.value;

    this.registroService.registrarUsuario(nuevoUsuario).subscribe({
      next: () => {
        alert('Usuario registrado correctamente');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al registrar usuario:', err);
        alert('Error al registrar usuario');
      }
    });
  } else {
    alert('Completa todos los campos correctamente');
  }
}

  volverAOfertas() {
  this.router.navigate(['/mostrar-oferta']);
}

}
