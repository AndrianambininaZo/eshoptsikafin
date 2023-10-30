import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from 'src/app/model/admin.model';
import { AdminService } from 'src/app/service/admin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent implements OnInit {
  imageUrl="http://localhost:8087/e_shop/telechargerImage/";
  listProduit!:Array<Produit>
  p: number = 1;
  collection: any;

  constructor(private http: HttpClient, private service:AdminService,private route:Router) { }

  ngOnInit(): void {
    this.getListProduit();   
  }

  getListProduit(){
    this.service.listProduit().subscribe({
      next:(data)=>{
        this.listProduit=data
      },error:(err)=>{
        console.log(err);
      }
    })
  }

  modifierSlider(idProduit:number){
   this.service.modifierProduitSlider(idProduit).subscribe({
    next:(data)=>{
      this.getListProduit();
    },error:(err)=>{
      console.log(err);
    }
   })
  }

  modifierPromo(idProduit:number){
    this.service.modifierProduiPromo(idProduit).subscribe({
      next:(data)=>{
        this.getListProduit();
      },error:(err)=>{
        console.log(err);
      }
     })   
  }

  modifierNewProd(idProduit:number){
    this.service.modifierProduitNew(idProduit).subscribe({
      next:(data)=>{
        this.getListProduit();
      },error:(err)=>{
        console.log(err);
      }
     })   
  }

  modifierProduit(productId: number){
    this.route.navigateByUrl("/eshop_admin/modifier_produit/"+productId); 
  }

  deleteProduct(productId: number) {
    this.service.deleteProduct(productId).subscribe({
      next:(data)=>{
        this.getListProduit();
      },error:(err)=>{
        console.log(err);
      }
    });
  }

}
