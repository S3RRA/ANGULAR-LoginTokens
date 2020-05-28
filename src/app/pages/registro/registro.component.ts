import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarUsuario: false;

  constructor( private auth: AuthService,
              private router: Router ) { }

  ngOnInit() {
    this.usuario = new UsuarioModel;
  }

  onSubmit( form: NgForm){

    if ( form.invalid ) { return; }

    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor ... ',
      icon: 'info'
    });
    Swal.showLoading();

    this.auth.nuevoUsuario( this.usuario )
      .subscribe( resp => {
        
        if ( this.recordarUsuario ){
          localStorage.setItem('email', this.usuario.email);
        }

        Swal.close();
        console.log( resp );
        this.router.navigateByUrl('/home');

      }, (e) => {
        console.log(e.error.error.message);
        Swal.fire({
          icon: 'error',
          text: e.error.error.message,
          title: 'Error al crear la cuenta'
        });
      });
  }

}
