import { Injectable } from '@angular/core';
import { Client } from '../model/client.model';
import { AdminService } from './admin.service';
import { ClientService } from './client.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user!:Client;
  authentication:boolean=false;
  storageKey:string="jwt-token"

  constructor(private serviceClient:ClientService,private route:Router) { }

  public loadProfile(id:string){    
    this.authentication=true;
    this.createStorageId(id);
    this.Verification(id);
  }
 public createStorageId(id:string) {
    localStorage.setItem(this.storageKey, id);
  }
 public getLocalStorage(){
    const data = localStorage.getItem(this.storageKey);
    if(data){
      this.loadProfile(data);
    }
  }


 public Verification(id:string){ 
  if(id){
    this.serviceClient.getClient(id).subscribe({
      next:(data)=>{        
        this.user=data;       
      },error:(err)=>{
        this.authentication=false
        localStorage.removeItem(this.storageKey);       
      }
    })
  }
  }
}
