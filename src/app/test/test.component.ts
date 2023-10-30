import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private serviceAuth:AuthenticationService) { }

  ngOnInit(): void {
  }

  openFileInput() {
    // Déclencher l'ouverture de l'élément input[type="file"]
    this.fileInput.nativeElement.click();
  }
  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Vous pouvez faire quelque chose avec le fichier ici, par exemple l'envoyer à un serveur.
      console.log('Fichier sélectionné :', file);
    }
  }


  testAUth(){
    console.log(this.serviceAuth.authentication);
  }

}
