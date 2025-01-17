import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Moneda } from '../../Entidad/Moneda';
import { Route, Router } from '@angular/router';
import { WsService } from '../../Service/ws.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-guardar',
  imports: [FormsModule],
  templateUrl: './guardar.component.html',
  styleUrl: './guardar.component.css'
})
export class GuardarComponent {
moneda :Moneda= new Moneda();
constructor(private router:Router, private service:WsService){}

guardar(){
  this.service.guadar(this.moneda).subscribe(data=>{
    console.log(JSON.stringify(data));
    Swal.fire({
      title: "GUARDAR",
      text: JSON.stringify(data),
      icon: "success"
    }).then(() =>{
      this.router.navigate(['listar']);
    });
  },(error: HttpErrorResponse)=>{
    Swal.fire({
      title: "GUARDAR",
      text: JSON.stringify(error.error.Mensaje),
      icon: "error"
    })
  })
  }
}
