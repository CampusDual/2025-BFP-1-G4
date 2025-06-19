import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { JwtPayload } from '../../models/jwt-payload';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentYear: number;

  loginF = this.lf.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false],
  });

  hide = true;


  constructor(private lf: FormBuilder, private authService: AuthService, private router: Router) {
  this.currentYear = new Date().getFullYear();
   }

  onSubmit() {
    if (this.loginF.valid) {
      const email = this.loginF.value.email!;
      const password = this.loginF.value.password!;
      const rememberMe = this.loginF.value.rememberMe;


      this.authService.login({ email, password }).subscribe({
        next: (res: string) => {

          sessionStorage.setItem('token', res);
          sessionStorage.setItem('email', email || '');

          if (rememberMe) {
            localStorage.setItem('rememberedEmail', email || '');

          } else {
            localStorage.removeItem('rememberedEmail');
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
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      this.loginF.patchValue({ email: rememberedEmail });
    }
  }

}