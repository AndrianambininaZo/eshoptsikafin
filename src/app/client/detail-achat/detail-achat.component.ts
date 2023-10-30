import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vente } from 'src/app/model/client.model';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-detail-achat',
  templateUrl: './detail-achat.component.html',
  styleUrls: ['./detail-achat.component.scss']
})
export class DetailAchatComponent implements OnInit {
  idModule!:number;
  listeVente!:Array<Vente>

  constructor(private route: ActivatedRoute,private router:Router,private serviceClient:ClientService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idModule = +params.get('id')!;
    });
    this.getLigneCommande();
  }
  getLigneCommande(){
    this.serviceClient.getVente(this.idModule).subscribe({
      next:(data)=>{
        this.listeVente=data;
        console.log(data);
      },error:(err)=>{
        console.log(err);
      }
    })
  }

}
