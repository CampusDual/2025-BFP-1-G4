import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-publicar-oferta',
  templateUrl: './publicar-oferta.component.html',
  styleUrls: ['./publicar-oferta.component.css']
})
export class PublicarOfertaComponent{
    oferta = this.of.group({
    tituto: [''],
    descripcion: [''],
  });

  constructor(private of: FormBuilder){}

  onSubmit() {
      
  }

}
