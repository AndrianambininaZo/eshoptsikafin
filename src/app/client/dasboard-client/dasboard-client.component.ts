import { Component, HostListener, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Produit, ProduitPanier, ImagesModel } from 'src/app/model/admin.model';
import { AdminService } from 'src/app/service/admin.service';
import { PanierService } from 'src/app/service/panier.service';

@Component({
  selector: 'app-dasboard-client',
  templateUrl: './dasboard-client.component.html',
  styleUrls: ['./dasboard-client.component.scss']
})
export class DasboardClientComponent implements OnInit { 
  
 
  image = [
    './../../../assets/images/superfondtsik.png',
    './../../../assets/images/robeslide.png',
    'a./../../../assets/images/enfanslide.png',
    'a./../../../assets/images/slidersport.png',
  ];
  images :Array<ImagesModel>= [
    {img:'./../../../assets/images/superfondtsik.png',nom:'Chemis bley',genre:'Homme'  },
    {img:'./../../../assets/images/robeslide.png',nom:'Robe de soir',genre:'Femme'  },
    {img:'./../../../assets/images/enfanslide.png',nom:'Vtemenet ete',genre:'Enfant'  },
    {img:'./../../../assets/images/slidersport.png',nom:'Sport de',genre:'Homme'  },
  ]

  customOptions: any = {
    loop: true, // Carrousel infini
    items: 1,
    autoplay: true,
    autoplayTimeout: 4000, // Activation des indicateurs de pagination    
  };
  listNouveauProduit!:Array<Produit>
  listPromo!:Array<Produit>
  imageUrl="http://localhost:8087/e_shop/telechargerImage/";

  constructor(private service:AdminService, private servicePanier:PanierService) { }

  ngOnInit(): void {
    this.getListNouveauProduit();
    this.getListNouveauPromo()
  }
  getListNouveauProduit(){
    this.service.listNewProduit().subscribe({
      next:(data)=>{
        this.listNouveauProduit=data        
      },error:(err)=>{
        console.log(err);
      }
    })
  }
  getListNouveauPromo(){
    this.service.listPromProduit().subscribe({
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
