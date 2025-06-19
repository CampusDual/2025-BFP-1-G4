import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PublicarOfertaComponent } from './componentes/publicar-oferta/publicar-oferta.component';
import { ListaOfertasComponent } from './componentes/lista-ofertas/lista-ofertas.component';
import { MostrarOfertaComponent } from './componentes/mostrar-oferta/mostrar-oferta.component';


const routes: Routes = [
  { path: 'mostrar-oferta', component: MostrarOfertaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'publicar-oferta', component: PublicarOfertaComponent },
   { path: 'lista-ofertas', component: ListaOfertasComponent },
  { path: '', redirectTo: '/mostrar-oferta', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
