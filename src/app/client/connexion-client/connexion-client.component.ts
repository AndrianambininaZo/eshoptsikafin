import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client, LoginRequest } from 'src/app/model/client.model';
import { ClientService } from 'src/app/service/client.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-connexion-client',
  templateUrl: './connexion-client.component.html',
  styleUrls: ['./connexion-client.component.scss']
})
export class ConnexionClientComponent implements OnInit {
  isCompte:boolean=true;
  formInscription!:FormGroup
  requestClient?:Client
  formConnection!:FormGroup
  InvalidConnexion:string=""
  constructor(private route:Router,private serviceAuthe:AuthenticationService,private fb:FormBuilder,private serviceClient:ClientService ,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.formInscription=this.fb.group({
      nom:this.fb.control(""),
      prenom:this.fb.control("",[Validators.required]),
      adresse:this.fb.control("",[Validators.required]),
      telephone:this.fb.control("",[Validators.required]),
      email:this.fb.control("",[Validators.required]),
      password:this.fb.control("",[Validators.required,Validators.maxLength(20), Validators.minLength(6)])
    });

    this.formConnection=this.fb.group({
      nom:this.fb.control(""),
      email:this.fb.control("",[Validators.required,Validators.email]),
      password:this.fb.control("",[Validators.required,Validators.maxLength(20), Validators.minLength(6)])
    });
  }
  test(){
    this.toastr.success("Votre compta a éte créer avec success","Success")

  }

  creerCompte(){
    this.isCompte=false
  }

  annuller(){
    this.formInscription.reset(0);
  }

  handleInscription(){
    let requestClient=new Client();
    requestClient=this.formInscription.value
    this.serviceClient.inscription(requestClient).subscribe({
      next:(data)=>{
        this.formInscription.reset(0)
        this.toastr.success("Votre compte a éte créer avec success","Success");
        window.location.reload()
      },error:(err)=>{       
      }
    })
  }
//connexion
  handleConnexion(){
    if (this.formConnection.valid) {
      let login=new LoginRequest();
      login=this.formConnection.value
      this.serviceClient.login(login).subscribe({
        next:(data)=>{
          this.serviceAuthe.loadProfile(data.id!);
          this.InvalidConnexion="" ;
          this.route.navigateByUrl("/")
        },error:(err)=>{
          this.InvalidConnexion="Votre mot de passe ou email invalid";
        }
      })
          
    }else{
      this.InvalidConnexion="Invalid connexion!"
    }
  }

}
