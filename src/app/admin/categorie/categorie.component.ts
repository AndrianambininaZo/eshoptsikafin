import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { Categories } from 'src/app/model/admin.model';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {
  isForm:boolean=false;
  formCategorie!:FormGroup;
  listCategorie!:Array<Categories>
  p: number = 1;
  collection: any;

  constructor(private fb:FormBuilder,private service:AdminService,private toast:ToastrService) { }

  ngOnInit(): void {
    this.formCategorie=this.fb.group({
      nom:this.fb.control("",[Validators.required]),
      genre:this.fb.control("",[Validators.required]),
    });
    
    this.getListeCategories();
    }
  isShowForm(){
    this.isForm=true
  }
  isFermeForm(){
    this.isForm=false
    this.formCategorie.reset(0)
  }
  handleCategorie(){
    let categorie=new Categories();
    categorie=this.formCategorie.value
    this.service.saveCategorie(categorie).subscribe({
      next:(data)=>{
        this.formCategorie.reset(0);
        this.toast.success("Enregitrement avec success!","Succees");
        this.isForm=false;
        this.getListeCategories();
      },error:(err)=>{
        console.log(err)
      }
    })
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
  deleteCategoerie(id:number){
  }

}
