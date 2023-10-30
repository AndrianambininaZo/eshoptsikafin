import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProduitPanier } from 'src/app/model/admin.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { PanierService } from 'src/app/service/panier.service';

@Component({
  selector: 'app-app-client',
  templateUrl: './app-client.component.html',
  styleUrls: ['./app-client.component.scss']
})
export class AppClientComponent implements OnInit {
  nombreProduitsDansPanier!:number
nombreInitPanie!:number
  private storageKey = 'proList';
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollY = window.scrollY; // Obtient la position de défilement en pixels
    const windowHeight = window.innerHeight; // Obtient la hauteur de la fenêtre visible en pixels
    const scrollYvh = (scrollY / windowHeight) * 100; // Convertit la position de défilement en vh

    if (scrollYvh >= 50) {
      console.log("5Ovh plus")
    }else{
      console.log("5Ovh moins")      
    }
  }

  constructor(private route:Router,private servicePanier:PanierService,public serviceAuth:AuthenticationService) { 
    
  }
  

  ngOnInit(): void { 
    this.getListPanier() 
    this.getList();  
  }
  
  deconnexion(){
    localStorage.clear();
    window.location.reload();
  }

  getListPanier(){
    this.servicePanier.panier$.subscribe(panier => {
      this.nombreProduitsDansPanier = panier;
    });
  }
  getList():ProduitPanier[] {
    console.log("salut")
    const data = localStorage.getItem(this.storageKey);
    this.nombreInitPanie= data? JSON.parse(data!).length:0
    return data ? JSON.parse(data) : [];
  }



}
