import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Categories, Produit, ProduitRequest } from 'src/app/model/admin.model';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-modifier-produit',
  templateUrl: './modifier-produit.component.html',
  styleUrls: ['./modifier-produit.component.scss']
})
export class ModifierProduitComponent implements OnInit {

  idProduit!:number;
  sommeMontant!:number;
  formProduit!:FormGroup;
  produit!:Produit
  listCategorie!:Array<Categories>;
  constructor(private route: ActivatedRoute,private router:Router,private service:AdminService,private fb:FormBuilder) {
  
   }

   ngOnInit(): void {
    this.formProduit = this.fb.group({
      nom: this.fb.control(''),
      description: this.fb.control(''),
      prix: this.fb.control(''),
      stock: this.fb.control(''),
      categorieId: this.fb.control('')
    });
  
    this.route.paramMap.pipe(
      switchMap(params => {
        this.idProduit = +params.get('id')!;
        return this.service.getProduit(this.idProduit);
      })
    ).subscribe({
      next:(data) => {
        this.produit = data;
        if (this.produit) {
          //replir le formulaire
          this.formProduit.patchValue(this.produit);
        }
      },
      error:(err) => {
        console.log(err);
      }
    });
    this.getListeCategories()
  }  
  annuller(){
    this.formProduit.reset(0);
  }

  getListeCategories(){
    this.service.listCategorie().subscribe({
      next:(data)=>{
        this.listCategorie=data
      },error:(err)=>{
        console.log(err);
      }
    })
  }
  handleProduit(){
    let produit=new ProduitRequest();
    produit=this.formProduit.value;
    produit.id=this.idProduit
    this.service.modierProduit(produit).subscribe({
      next:(data)=>{ 
        this.annuller();      
      },error:(err)=>{
        console.log(err);
      }
    });
   
  }

}
