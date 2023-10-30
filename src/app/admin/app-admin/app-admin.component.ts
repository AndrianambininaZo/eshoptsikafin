import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-app-admin',
  templateUrl: './app-admin.component.html',
  styleUrls: ['./app-admin.component.scss']
})
export class AppAdminComponent implements OnInit {
 

  constructor(private route:Router,private serviceAuth:AuthenticationService) { }

  ngOnInit(): void {
   
  }
  deconnexion(){
    this.route.navigateByUrl("/connexion__eshoptsika");
    localStorage.clear()
  }

}
