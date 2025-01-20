import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Moneda } from '../Entidad/Moneda';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  constructor( private hhtp: HttpClient) { }

  //url
  url="http://localhost:8001/moneda"

  listar(){
    return this.hhtp.get<Moneda[]>(this.url);
  }
  guadar(moneda:Moneda){
    return this.hhtp.post<String>(this.url+"/guardar",moneda);
  }
  editar(moneda:Moneda){
    return this.hhtp.post<String>(this.url+"/editar",moneda);

  }
 buscar(numCia : number){
  return this.hhtp.get<Moneda>(`${this.url}/${numCia}`);
 }
eliminar(numCia:number){
  return this.hhtp.delete<Moneda>(`${this.url}/eliminar/${numCia}`);
}
 filtrar(status: string, numCia: number | null) {
  let params: any = {};
  if (status) params.status = status;
  if (numCia !== null) params.numCia = numCia;
return this.hhtp.get<Moneda | Moneda[]>(`${this.url}/filtro`, {params: params,});
}
}
