import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Commande } from 'src/app/model/client.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-achat-admin',
  templateUrl: './achat-admin.component.html',
  styleUrls: ['./achat-admin.component.scss']
})
export class AchatAdminComponent implements OnInit {
  listCommande!:Array<Commande>
  p: number = 1;
  collection: any;
  

  constructor(private route: ActivatedRoute,private router:Router, private service:ClientService,private serviceAuth:AuthenticationService) { }


  ngOnInit(): void {
    this.getListCommande()
  }
  getListCommande(){
    this.service.getListTousCommande().subscribe({
      next:(data)=>{
        this.listCommande=data.filter((res)=>{
          return res.validation==0;
        })
      },error:(err)=>{
        console.log()
      }
    })
  }
  voirDetail(id:number){
    this.router.navigateByUrl("/eshop_admin/details/"+id);
  }
  ValiderVente(idCommande:number){
    
  }

}
