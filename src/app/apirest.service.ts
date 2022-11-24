import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular'


@Injectable({
  providedIn: 'root'
})
export class ApirestService {
//json-server --watch datos.json
  listado = [];
  item: any;
  private urlBaseApi = 'http://localhost:3000/';
  

  constructor(private httpClient: HttpClient, private storage: Storage) {
    this.init();
   }

   getUsers()
  {
    let url = this.urlBaseApi + 'usuariosClientes';
    this.listado = [];
    return new Promise((resolve, rejects) => 
    {
      this.httpClient.get(url).subscribe((data:[]) =>
      {
        resolve(data);
        data.forEach(item => { this.listado.push(item); })
      },
      error =>
      {
        console.log("Error en el servidor")
      });
    });
  }
  getUser(username:String)
  {
    let url = this.urlBaseApi + 'usuariosClientes?username=' + username;
    return new Promise((resolve, rejects) => 
    {
      this.httpClient.get(url).subscribe((data: any) =>
      {
        resolve(data);
        this.item = data;
        
      },
      error =>
      {
        console.log("Error en el servidor")
      });
    });
  }
  getEstacionamientos()
  {
    let url = this.urlBaseApi + 'estacionamientos';
    this.listado = [];
    return new Promise((resolve, rejects) => 
    {
      this.httpClient.get(url).subscribe((data:[]) =>
      {
        resolve(data);
        data.forEach(item => { this.listado.push(item); })
      },
      error =>
      {
        console.log("Error en el servidor")
      })
    });
  }
  getEstacionamiento(id: string)
  {
    let url = this.urlBaseApi + 'estacionamientos?id='+id;
    return new Promise((resolve, rejects) => 
    {
      this.httpClient.get(url).subscribe((data: any) =>
      {
        resolve(data);
        this.item = data;
      },
      error =>
      {
        console.log("Error en el servidor")
      });
    });
  }
   //========================================
   //========================================
   async init()
   {
     await this.storage.create();
   }
   async agregar(key: string, valor: any)
   {
     await this.storage.set(key, valor);
   }
   async leer(key: string)
   {
     return await this.storage.get(key);
   }
 
   async listar()
   {
     let listado = []
     await this.storage.forEach((v,k) => { listado.push(v[0]); });
     return listado;
   }
   async eliminar(key: string)
   {
     this.storage.remove(key);
   }
}
