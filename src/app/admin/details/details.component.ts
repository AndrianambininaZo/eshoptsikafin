import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Commande, Vente } from 'src/app/model/client.model';
import { AdminService } from 'src/app/service/admin.service';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  idModule!:number;
  listeVente!:Array<Vente>
  sommeMontant!:number
  commande!:Commande
  constructor(private route: ActivatedRoute,private router:Router,private service:AdminService,private serviceClient:ClientService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idModule = +params.get('id')!;
    });
    this.getLigneCommande();
  }
  getLigneCommande(){
    this.serviceClient.getVente(this.idModule).subscribe({
      next:(data)=>{
        this.listeVente=data;
       let isCommande=data.find(res=>res.commande?.id==this.idModule);
       this.commande=isCommande?.commande!;     
        this.sommeMontant=data.reduce((accumulateur, objetCourant) => accumulateur + objetCourant.ligneCommande?.sousTotal!, 0);
      },error:(err)=>{
        console.log(err);
      }
    })
  }

  deleteVente(venteId: number) {
    this.service.deleteVente(venteId).subscribe({
      next:(data)=>{
        this.getLigneCommande();
      },error:(err)=>{
        console.log(err);
      }
    });
  }
  validateVente(){
   this.service.validerterVente(this.idModule).subscribe({
    next:(data)=>{
      this.router.navigateByUrl("/eshop_admin/vente")      
    },error:(err)=>{
      console.log(err);
    }
   })
  }


}
