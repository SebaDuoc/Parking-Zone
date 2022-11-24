import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApirestService } from '../apirest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

USU     : String;
CONT  : String;
listado : any = [];
formularioRegistro: FormGroup;
listaUser : any = [];


  constructor(private crud: ApirestService,
    private alertController: AlertController,
    private toastController: ToastController,
    public fb : FormBuilder,
    public navCtrl: NavController,
    private api : ApirestService) { }
    async agregar(usu: HTMLInputElement, cont: HTMLInputElement)
    {
    const USU     = usu.value.trim();
    const CONT  = cont.value.trim();
    
    
    if(USU.length < 1)
    {
    const alert = await this.alertController.create({
    header: 'Alerta',
    subHeader: 'Error en el ingreso de datos',
    message: 'Falta el usuario',
    buttons: ['OK'],
    });    
    await alert.present();      
    }
    else if(CONT.length < 1)
    {
    const alert = await this.alertController.create({
    header: 'Alerta',
    subHeader: 'Error en el ingreso de datos',
    message: 'Falta la contraseña',
    buttons: ['OK'],
    });    
    await alert.present();      
    }
    else
    {
    const datos = [{ "usuario"      : usu.value,
                      "contasena"  : cont.value
                   }];
    // validar los datos antes de guardar...
    await this.crud.agregar(usu.value, datos);
    usu.value= "";
    cont.value= "";
    
    
    
    
    var pass1 = "1234";

    await this.api.getUser(USU);
    this.listado = this.api.item;
    console.log(this.listado);
    
    
    
    if  ( this.listado.length > 0 && CONT == pass1){
      console.log('Ingresado');
      this.navCtrl.navigateRoot('inicio');
      localStorage.setItem('usuario', USU);
      localStorage.setItem('datosUsuario', JSON.stringify(this.listado));
      
    }
    else{
      console.log ('Datos Incorrectos');
      const alert = await this.alertController.create({
        header: 'Alerta',
        subHeader: 'Error en el ingreso de datos',
        message: 'Usuario y/o contraseña incorrecta',
        buttons: ['OK'],
        });    
        await alert.present();
          }
        }
      }
    
      ngOnInit() {
      }
    }
    
    
  


