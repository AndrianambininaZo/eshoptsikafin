import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Commande } from 'src/app/model/client.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-achat-client',
  templateUrl: './achat-client.component.html',
  styleUrls: ['./achat-client.component.scss']
})
export class AchatClientComponent implements OnInit {

  listCommande!:Array<Commande>
  

  constructor(private route: ActivatedRoute,private router:Router, private service:ClientService,private serviceAuth:AuthenticationService) { }

  ngOnInit(): void {
    this.getListCommande();
   
    }
  getListCommande(){
    this.service.getLisCommande(this.serviceAuth.user.id!).subscribe({
      next:(data)=>{
        this.listCommande=data
        console.log(data)
      },error:(err)=>{
        console.log()
      }
    })
  }
  voirDetail(id:number){
    this.router.navigateByUrl("/details/"+id);
  }

}
