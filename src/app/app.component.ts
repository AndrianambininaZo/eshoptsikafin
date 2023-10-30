import { Component } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eshoptsika';
  constructor(private serviceAuth:AuthenticationService) { }

  ngOnInit(): void {
    this.serviceAuth.getLocalStorage();   
  }
  
}
