import { Component, numberAttribute, OnInit } from '@angular/core';
import { Moneda } from '../../Entidad/Moneda';
import { Router } from '@angular/router';
import { WsService } from '../../Service/ws.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar',
  imports: [FormsModule, CommonModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit{
moneda : Moneda = new Moneda();
constructor(private router:Router, private service:WsService){}
ngOnInit(): void {
  this.buscar();
}

buscar(){
  var numCia= Number(localStorage.getItem("numCia"));
  this.moneda.numCia=numCia;
  this.service.buscar(numCia).subscribe(data=>{
    console.log(JSON.stringify(data));
    this.moneda=data;
    Swal.fire({
      title :'EDITAR',
      text:'Moneda'+ this.moneda.numCia+"cargado exitosamente",
      icon:'success',
      timer:1500
    });

  })
}
editar(){
  this.service.editar(this.moneda).subscribe(data=>{
    Swal.fire({
      title :'EDITAR',
      text: JSON.stringify(data),
      icon:'success',
      timer:2000
    }).then(()=>{
      this.router.navigate(['listar']);
    
    });
  })
}
}
