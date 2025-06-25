import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentYear: number;

  loginF = this.lf.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false],
  });

  hide = true;

  constructor(private lf: FormBuilder, private authService: AuthService, private router: Router) {
    this.currentYear = new Date().getFullYear();
  }

  onSubmit() {
    if (this.loginF.valid) {
      const username = this.loginF.value.username!;
      const password = this.loginF.value.password!;
      const rememberMe = this.loginF.value.rememberMe;

      this.authService.login({ username, password }).subscribe({
        next: (res: string) => {
          sessionStorage.setItem('token', res);
          sessionStorage.setItem('username', username || '');

          if (rememberMe) {
            localStorage.setItem('rememberedUsername', username || '');
          } else {
            localStorage.removeItem('rememberedUsername');
          }

          this.router.navigate(['/publicar-oferta']);
        },
        error: (err: string) => {
          alert('Datos incorrectos');
        }
      });
    }
  }

  ngOnInit(): void {
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    if (rememberedUsername) {
      this.loginF.patchValue({ username: rememberedUsername });
    }
  }
}
