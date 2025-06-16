import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PublicarOfertaComponent } from './publicar-oferta/publicar-oferta.component';
import { OfertasComponent } from './ofertas/ofertas.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'publicar-oferta', component: PublicarOfertaComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'ofertas', component: OfertasComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
