import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categories, ProduitRequest } from 'src/app/model/admin.model';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-creer-produit',
  templateUrl: './creer-produit.component.html',
  styleUrls: ['./creer-produit.component.scss']
})
export class CreerProduitComponent implements OnInit {
  formProduit!:FormGroup;
  listCategorie!:Array<Categories>;
  selectedFile!: File;
  imageUrl!: string;

  constructor(private fb:FormBuilder,private service:AdminService) { }

  ngOnInit(): void {
    this.formProduit=this.fb.group({
      nom:this.fb.control("",[Validators.required]),
      description:this.fb.control("",[Validators.required]),
      prix:this.fb.control("",[Validators.required,Validators.minLength(3)]),
      stock:this.fb.control("",[Validators.required]),
      categorieId:this.fb.control("",[Validators.required]),
      image:this.fb.control("",[Validators.required]),
    });
    this.getListeCategories()
  }
  annuller(){
    this.formProduit.reset(0);
    this.imageUrl="";
    this.selectedFile=undefined!
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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  
  handleProduit(){
    let produit=new ProduitRequest();
    produit=this.formProduit.value
    this.service.saveProduit(produit).subscribe({
      next:(data)=>{
        this.onUpload(data.id!) 
        this.annuller();      
      },error:(err)=>{
        console.log(err);
      }
    })  
  }
  onUpload(id:number) {
    const formData = new FormData();
    formData.append('file', this.selectedFile); 
    this.service.uploadeImageProduit(id,formData).subscribe({
      next:(data)=>{
        console.log(data);
      },error:(err)=>{
        console.log(err);
      }
    }) 
  }

}
