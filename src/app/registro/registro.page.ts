import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { ApirestService } from '../apirest.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  NOM: String;
  USU: String;
  CONT: String;
  CORR: String;
  RUT: String;
  PAT: String;
  TIPO: Boolean;
  formularioRegistro: FormGroup;

  constructor(private crud: ApirestService,
    private alertController: AlertController,
    private toastController: ToastController,
    public fb: FormBuilder,
    public navCtrl: NavController,
    private api : ApirestService) { }

    async agregar(usu: HTMLInputElement, cont: HTMLInputElement, nom:HTMLInputElement
      , rut:HTMLInputElement, corr:HTMLInputElement)
    {
    const USU     = usu.value.trim();
    const CONT  = cont.value.trim();
    const NOM  = cont.value.trim();
    const RUT  = cont.value.trim();
    const CORR  = cont.value.trim();
    
    
    
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
    
    else if(NOM.length < 1)
    {
    const alert = await this.alertController.create({
    header: 'Alerta',
    subHeader: 'Error en el ingreso de datos',
    message: 'Falta el nombre',
    buttons: ['OK'],
    });    
    await alert.present();      
    }
    
    else if(RUT.length < 1)
    {
    const alert = await this.alertController.create({
    header: 'Alerta',
    subHeader: 'Error en el ingreso de datos',
    message: 'Falta el rut',
    buttons: ['OK'],
    });    
    await alert.present();      
    }
    
    else if(CORR.length < 1)
    {
    const alert = await this.alertController.create({
    header: 'Alerta',
    subHeader: 'Error en el ingreso de datos',
    message: 'Falta el correo',
    buttons: ['OK'],
    });    
    await alert.present();      
    }
    
    else
    {
    const datos = [{ "usuario"      : usu.value,
                      "contasena"  : cont.value,
                      "nombre" : nom.value,
                      "correo" : corr.value,
                      "rut" : rut.value
                   }];
    // validar los datos antes de guardar...
    await this.crud.agregar(usu.value, datos);
    usu.value= "";
    cont.value= "";
    nom.value="";
    corr.value="";
    rut.value="";
    }
    
    
      } 
      ngOnInit() {
      }
    
    }