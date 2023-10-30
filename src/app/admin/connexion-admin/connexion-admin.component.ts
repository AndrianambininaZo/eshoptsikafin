import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginRequest } from 'src/app/model/client.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-connexion-admin',
  templateUrl: './connexion-admin.component.html',
  styleUrls: ['./connexion-admin.component.scss']
})
export class ConnexionAdminComponent implements OnInit {
  formConnection!:FormGroup;
  InvalidConnexion:string=""

  constructor(private route:Router,private serviceAuthe:AuthenticationService,private fb:FormBuilder,private serviceClient:ClientService ,private toastr: ToastrService) { }

  ngOnInit(): void { 
     this.formConnection=this.fb.group({
    email:this.fb.control("",[Validators.required,Validators.email]),
    password:this.fb.control("",[Validators.required,Validators.maxLength(20), Validators.minLength(6)])
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
          this.route.navigateByUrl("/eshop_admin")
        },error:(err)=>{
          console.log(err);
          this.InvalidConnexion="Votre mot de passe ou email invalid";
        }
      })
          
    }else{
      this.InvalidConnexion="Invalid connexion!"
    }
  }


}
