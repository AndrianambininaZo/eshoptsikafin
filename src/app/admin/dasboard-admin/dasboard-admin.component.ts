import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Commande } from 'src/app/model/client.model';
import { AdminService } from 'src/app/service/admin.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-dasboard-admin',
  templateUrl: './dasboard-admin.component.html',
  styleUrls: ['./dasboard-admin.component.scss']
})
export class DasboardAdminComponent implements OnInit {
  
  nombreCommande!:number
  nombreProduit!:number
  nombreUtilisateur!:number
  isConneted!:boolean
  listCommande!:Array<Commande>;
  nombreVente!:number
  constructor(private serviceAuth:AuthenticationService,private serviceAdmin:AdminService,private clientService:ClientService,private router:Router) { 
    this.isConneted=serviceAuth.authentication    
  }

  ngOnInit(): void { 
    this.getListClient();
    this.getListCommande()    
  }
  getListClient(){
    this.clientService.getListClient().subscribe({
      next:(data)=>{
        this.nombreUtilisateur=data.length
      },error:(err)=>{
        console.log(err);
      }
    })
  }
  getListCommande(){
    this.clientService.getListTousCommande().subscribe({
      next:(data)=>{
        let isCommande=data.filter((res)=>{
          return res.validation==0;
        });
        this.listCommande=isCommande.slice(-5);
        this.nombreVente=data.filter((res)=>{
          return res.validation==1;
        }).length;
        this.nombreCommande=isCommande.length
      },error:(err)=>{
        console.log()
      }
    })
  }
  voirDetail(id:number){
    this.router.navigateByUrl("/eshop_admin/details/"+id);
  }

}
