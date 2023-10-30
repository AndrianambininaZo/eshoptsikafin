import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProduitPanier } from 'src/app/model/admin.model';
import { Client, CommandeRequest } from 'src/app/model/client.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ClientService } from 'src/app/service/client.service';
import { PanierService } from 'src/app/service/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {
  listPanier!:Array<ProduitPanier>
  quatiteAjout:number=1;
  user!:Client;
  isConnecter:boolean=false;
  

  constructor(private route:Router, private servicePanier:PanierService,private serviceAuthe:AuthenticationService,private serviceClient:ClientService) { }

  ngOnInit(): void {
    this.getListePanier();
    this.user!=this.serviceAuthe.user?.id;
  }

  getListePanier(){
    this.listPanier=this.servicePanier.getList();
  }

  updatePanier(poduit:ProduitPanier){
    this.servicePanier.updateListPanier(poduit);

  }

  handleMoins(id:number){
    let panier = this.listPanier.find(res => res.id == id);
    // Augmentez la quantité du panier de 1
    if (panier) {
        panier.quantite = panier.quantite! - 1;
        panier.sousTotal=panier.prixUnitaire! * panier.quantite
        this.updatePanier(panier);
    }
    this.getListePanier()
  }

  handlePlus(id:number){
    let panier = this.listPanier.find(res => res.id == id);
    // Augmentez la quantité du panier de 1
    if (panier) {
        panier.quantite = panier.quantite! + 1;
        panier.sousTotal=panier.prixUnitaire! * panier.quantite
        this.updatePanier(panier);
    }
    this.getListePanier();
  }

  removeProduit(id:number){
    this.servicePanier.deleteUser(id);
    this.getListePanier();
  }
  validationAchat(){
    if (this.serviceAuthe.authentication==true) {
      console.log(this.listPanier);
      console.log(this.serviceAuthe.user?.id)
      let idClient=this.serviceAuthe.user?.id
        let lignedCommande=this.listPanier!
        console.log(lignedCommande);    
        let commande=new CommandeRequest();
        commande.clientId=idClient;
        commande.lingeCommandeRequests=lignedCommande
        commande.date=new Date();
        this.serviceClient.saveCommande(commande).subscribe({
          next:(data)=>{
            console.log(data);
            localStorage.removeItem("proList");
            this.getListePanier();
          },error:(err)=>{
            console.log(err);
          }
        });          
    }else{
      
      this.isConnecter=true;
      console.log(this.isConnecter)
    }  
  }

}
