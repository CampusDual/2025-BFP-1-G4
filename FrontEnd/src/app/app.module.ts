import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, JsonpInterceptor } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';

//Agular material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';



//componetes
import { PublicarOfertaComponent } from './componentes/publicar-oferta/publicar-oferta.component';
import { LoginComponent } from './auth/login/login.component';
import { NavComponent } from './core/nav/nav.component';
import { FooterComponent } from './core/footer/footer.component';
import { ListaOfertasComponent } from './componentes/lista-ofertas/lista-ofertas.component';
import { MostrarOfertaComponent } from './componentes/mostrar-oferta/mostrar-oferta.component';

//servicios
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './register/register.component';
import { ListaEmpresasComponent } from './componentes/lista-empresas/lista-empresas.component';
import { AdministrationComponent } from './administration/administration.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './services/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PublicarOfertaComponent,
    FooterComponent,
    NavComponent,
    ListaOfertasComponent,
    MostrarOfertaComponent,
    RegisterComponent,
    ListaEmpresasComponent,
    AdministrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    RouterModule,
    HttpClientModule,
    MatMenuModule,
    MatToolbarModule
  ],

  providers: [AuthService,
                  {
                    provide: HTTP_INTERCEPTORS,
                    useClass: JwtInterceptor,
                    multi: true
                  }
                ],
  bootstrap: [AppComponent]
})
export class AppModule { }
