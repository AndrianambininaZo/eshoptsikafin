import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Produit, ProduitPanier } from 'src/app/model/admin.model';
import { AdminService } from 'src/app/service/admin.service';
import { PanierService } from 'src/app/service/panier.service';

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.scss']
})
export class SportComponent implements OnInit {
  p: number = 1;
  collection: any;

  listNouveauProduit!:Array<Produit>
  listPromo!:Array<Produit>
  imageUrl="http://localhost:8087/e_shop/telechargerImage/";

  constructor(private titleService: Title,private service:AdminService, private servicePanier:PanierService) { }

  ngOnInit(): void {    
    this.titleService.setTitle('Femme');
    this.getListProduit();
  };

  getListProduit(){
    this.service.listProduitSport().subscribe({
      next:(data)=>{
        this.listPromo=data   
      },error:(err)=>{
        console.log(err);
      }
    })
  }
  addToCart(produit:Produit){
    let produitPanier=new ProduitPanier();
    produitPanier.id=produit.id
    produitPanier.prixUnitaire=produit.prix
    produitPanier.quantite=1;
    produitPanier.sousTotal=produit.prix
    produitPanier.nom=produit.nom
    this.servicePanier.addProduit(produitPanier);
  }

}
