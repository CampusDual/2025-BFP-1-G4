import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PublicarOfertaComponent } from './componentes/publicar-oferta/publicar-oferta.component';
import { ListaOfertasComponent } from './componentes/lista-ofertas/lista-ofertas.component';
import { MostrarOfertaComponent } from './componentes/mostrar-oferta/mostrar-oferta.component';
import { ListaEmpresasComponent } from './componentes/lista-empresas/lista-empresas.component';
import { RegisterComponent } from './register/register.component';
import { PerfilUsuarioComponent } from './componentes/perfil-usuario/perfil-usuario.component'; // importa el componente
import { AuthGuard } from './services/auth.guard';
import { AdministrationComponent } from './administration/administration.component';
import { CandidatosOfertaComponent } from './componentes/candidatos-oferta/candidatos-oferta.component';
import { VistaCandidatoComponent } from './vista-candidato/vista-candidato.component'; // ajusta la ruta si es distinta
import { PublicarEmpresaComponent } from './componentes/publicar-empresa/publicar-empresa.component';
import { EditarPerfilComponent } from './componentes/editar-perfil/editar-perfil.component';
import { DetalleOfertaComponent } from './detalle-oferta/detalle-oferta.component';

const routes: Routes = [
  /*{ path: 'lista-empresas', component: ListaEmpresasComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'lista-ofertas', component: ListaOfertasComponent, canActivate: [AuthGuard], data: { roles: ['enterprise'] } },
  { path: 'publicar-oferta', component: PublicarOfertaComponent, canActivate: [AuthGuard], data: { roles: ['enterprise'] } },
  { path: 'mostrar-oferta', component: MostrarOfertaComponent, canActivate: [AuthGuard], data: { roles: ['role user'] } },*/

  { path: 'administration', component: AdministrationComponent },
  { path: 'mostrar-oferta', component: MostrarOfertaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'lista-empresas', component: ListaEmpresasComponent },
  { path: 'lista-ofertas', component: ListaOfertasComponent },
  { path: 'publicar-oferta', component: PublicarOfertaComponent },
  { path: 'publicar-oferta:id', component: PublicarOfertaComponent },
  { path: 'editar-oferta/:id', component: PublicarOfertaComponent },
  { path: 'publicar-empresa', component: PublicarEmpresaComponent },
  { path: 'detalle-oferta', component: DetalleOfertaComponent },
  { path: 'publicar-empresa/:id', component: PublicarEmpresaComponent },
  { path: 'candidatos-oferta/:id', component: CandidatosOfertaComponent },
  { path: 'perfil-usuario', component: PerfilUsuarioComponent },
  { path: 'candidato/:id', component: VistaCandidatoComponent },
  { path: 'editar-perfil', component: EditarPerfilComponent },
  { path: '', redirectTo: '/mostrar-oferta', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
