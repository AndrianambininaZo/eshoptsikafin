import { Injectable } from '@angular/core';
import { Produit, ProduitPanier } from '../model/admin.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private storageKey = 'proList';
  private panierSubject = new BehaviorSubject<number>(0);
  panier$ = this.panierSubject.asObservable();
  constructor() {
  } 
  
 

  createList(produit: ProduitPanier[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(produit));
  }
 

  getList():ProduitPanier[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  addProduit(produit: ProduitPanier) {
    const produitList = this.getList();
    const produitExists = produitList.some((existingProduit) => existingProduit.id === produit.id);   
    if (!produitExists) {
      produitList.push(produit);
      this.createList(produitList);
    }
    let panierActuel = this.panierSubject.value;
    panierActuel=this.getList().length;
    this.panierSubject.next(panierActuel);
  }

  // Supprime un utilisateur de la liste par son ID
  deleteUser(produitId: number) {
    const produitList = this.getList();
    const updatedList =produitList.filter((user) => user.id !== produitId);
    this.createList(updatedList);
  }

  updateListPanier(produit:ProduitPanier){
    const produitList = this.getList();
    const updatedList =produitList.filter((user) => user.id !== produit.id);
    updatedList.push(produit);
    console.log(updatedList);
    this.createList(updatedList);    
  }
}
