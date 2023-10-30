export class Produit{
    id?:number;
    nom?:string;
    description?:string;
    prix?:number;
    stock?:number;
    slider?:number;
    newPromo?:number;
    newProd?:number;
    categorie?:Categories;
}


export class ProduitRequest{
    id?:number;
    nom?:string;
    description?:string;
    prix?:number;
    stock?:number;
    categorieId?:number;
}
export class Categories{
    id?:number;
    genre?:string;
    nom?:string;
}

export class ProduitPanier{
    id?:number;
    quantite?:number;
    prixUnitaire?:number;
    sousTotal?:number;
    nom?:string;
}
export interface ImagesModel{
    img:string;
    nom:string;
    genre:string;
}