import { Produit } from "./admin.model";

export class Client{
    id?:string;
    nom?:string;
    prenom?:string;
    adresse?:string;
    password?:string;
    telephone?:string;
    email?:string;
    role?:string;
}
export class LoginRequest{
    email?:string;
    password?:string;
}

export class Commande{
    id?:number;
    client?:Client;
    date?:Date
    validation?:number
}

export class CommandeRequest{
    id?: number;
    date?: Date;
    clientId?: string;
    lingeCommandeRequests?: LingeCommandeRequest[];
}
export class LingeCommandeRequest{
    id?:number;
    produitId?:number;
    quantite?:number;
    prixUnitaire?:number;
    sousTotal?:number;
}
export class Vente{
    id?:number
    commande?:Commande;
    ligneCommande?:LingeCommande

}
export class LingeCommande{
    id?:number;
    produit?:Produit;
    quantite?:number;
    prixUnitaire?:number;
    sousTotal?:number;
    date?:Date
}