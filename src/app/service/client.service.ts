import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Client, Commande, CommandeRequest, LoginRequest, Vente } from '../model/client.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http:HttpClient) { }

  public inscription(client:Client):Observable<Client>{
    return this.http.post<Client>(environment.backEndHost+"/e_shop/client",client);
  }

  public login(login:LoginRequest):Observable<Client>{
    return this.http.post<Client>(environment.backEndHost+"/api_e_shop/login",login);
  }

  public getClient(id:string):Observable<Client>{
    return this.http.get<Client>(environment.backEndHost+"/e_shop/client/"+id);
  };

  public getListClient():Observable<Array<Client>>{
    return this.http.get<Array<Client>>(environment.backEndHost+"/e_shop/list__client");
  };

  public saveCommande(commande:CommandeRequest):Observable<Commande>{
    return this.http.post<Commande>(environment.backEndHost+"/api_e_shop/commande",commande);
  }

  public getLisCommande(idClient:string):Observable<Array<Commande>>{
    return this.http.get<Array<Commande>>(environment.backEndHost+"/api_e_shop/list_commande/"+idClient);
  }

  public getVente(idCommande:number):Observable<Array<Vente>>{
    return this.http.get<Array<Vente>>(environment.backEndHost+"/api_e_shop/list_vente/"+idCommande);
  }

  public getListTousCommande():Observable<Array<Commande>>{
    return this.http.get<Array<Commande>>(environment.backEndHost+"/api_e_shop/list_commande");
  }
}
