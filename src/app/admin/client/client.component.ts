import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/model/client.model';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  listClient!:Array<Client>
  p: number = 1;
  collection: any;

  constructor(private clientService:ClientService) { }

  ngOnInit(): void {
    this.getClient()
  }
  getClient(){
    this.clientService.getListClient().subscribe({
      next:(data)=>{
        this.listClient=data.filter((res)=>{
          return res.role !="admin";
        })
      },error:(err)=>{
        console.log(err)
      }
    })
  }

}
