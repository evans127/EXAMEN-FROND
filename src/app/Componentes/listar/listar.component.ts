import { Component, OnInit } from '@angular/core';
import { WsService } from '../../Service/ws.service';
import { Moneda } from '../../Entidad/Moneda';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar',
  imports: [FormsModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent implements OnInit{
 constructor(private router:Router, private service:WsService){}
 moneda !:Moneda[];
 statusFiltro: string = '';
 ngOnInit(): void {
   this.listar();
 }
 listar(){
  this.service.listar().subscribe(data=>{
    console.log(JSON.stringify(data));
    this.moneda=data;
   })
 }
 guardar(){
  this.router.navigate(['guardar']);
 }
 editar(moneda : Moneda){
localStorage.setItem('numCia',moneda.numCia.toString());
this.router.navigate(['editar']);
}
eliminar(numCia:number){
  const Moneda: Moneda= this.moneda.find(t =>numCia=== numCia)!;
  Swal.fire({
    title: "Estas seguro?",
    text:"Esta accion no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText:"Si, eliminar",
    cancelButtonText: "Cancelar",
   }).then((result) =>{
    if(result.isConfirmed){
      this.service.eliminar(numCia).subscribe({
        next:() =>{
          this.listar();
          Swal.fire("Eliminado","La moneda ha sido eliminado con exito.","success");
        },
        error: (error) =>{
          Swal.fire ("Error","No se puede eliminar.Intentelo de nuevo","error");
  
        },
      });
    }
  });
}
buscarPorStatus() {
  if (this.statusFiltro.trim() === '') {
    this.listar();
  } else {
    this.service.buscarPorStatus(this.statusFiltro).subscribe(data => {
      this.moneda = data;
    });
  }
}
}
