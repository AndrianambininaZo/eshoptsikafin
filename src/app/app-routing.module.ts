import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppClientComponent } from './client/app-client/app-client.component';
import { DasboardClientComponent } from './client/dasboard-client/dasboard-client.component';
import { ConnexionClientComponent } from './client/connexion-client/connexion-client.component';
import { FemmeComponent } from './client/femme/femme.component';
import { HommeComponent } from './client/homme/homme.component';
import { EnfantComponent } from './client/enfant/enfant.component';
import { SportComponent } from './client/sport/sport.component';
import { PanierComponent } from './client/panier/panier.component';
import { FavorieComponent } from './client/favorie/favorie.component';
import { DasboardAdminComponent } from './admin/dasboard-admin/dasboard-admin.component';
import { AppAdminComponent } from './admin/app-admin/app-admin.component';
import { ProduitComponent } from './admin/produit/produit.component';
import { CreerProduitComponent } from './admin/creer-produit/creer-produit.component';
import { TestComponent } from './test/test.component';
import { AuthGuard } from './guard/auth.guard';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AchatClientComponent } from './client/achat-client/achat-client.component';
import { DetailAchatComponent } from './client/detail-achat/detail-achat.component';
import { CategorieComponent } from './admin/categorie/categorie.component';
import { AchatAdminComponent } from './admin/achat-admin/achat-admin.component';
import { DetailsComponent } from './admin/details/details.component';
import { ModifierProduitComponent } from './admin/modifier-produit/modifier-produit.component';
import { ConnexionAdminComponent } from './admin/connexion-admin/connexion-admin.component';
import { Vente } from './model/client.model';
import { VenteComponent } from './admin/vente/vente.component';
import { ClientComponent } from './admin/client/client.component';

const routes: Routes = [
  { path: 'connexion', component: ConnexionClientComponent },
  { path: 'connexion__eshoptsika', component: ConnexionAdminComponent },

  { path: 'access-denied', component: AccessDeniedComponent },

  { path: 'test', component: TestComponent },

  { path: '', component: AppClientComponent, children: [
    { path: '', component: DasboardClientComponent }, 
    { 
      path: 'details/:id', 
      component: DetailAchatComponent,
      canActivate: [AuthGuard],
      data: { role: ['client']}
    } ,
    {
      path: 'achat',
      component: AchatClientComponent,
      canActivate: [AuthGuard],
      data: { role: ['client'] }//voir authe gauar respect le nom hitan lah @@ data
    },  
    { path: 'femme', component: FemmeComponent ,},
    { path: 'homme', component: HommeComponent },
    { path: 'enfant', component: EnfantComponent },
    { path: 'sport', component: SportComponent },
    { path: 'panier', component: PanierComponent },
    { path: 'favorie', component: FavorieComponent },
  ] },
  
  { path: 'eshop_admin', component: AppAdminComponent, children: [
    { path: '', component: DasboardAdminComponent ,},
    { path: 'produit', component: ProduitComponent , 
    canActivate: [AuthGuard],
    data: { role: ['admin']}},
    { path: 'creer_produit', component: CreerProduitComponent, 
    canActivate: [AuthGuard],
    data: { role: ['admin']} },
    { path: 'modifier_produit/:id', component: ModifierProduitComponent, 
    canActivate: [AuthGuard],
    data: { role: ['admin']} },
    { path: 'categorie', component: CategorieComponent , 
    canActivate: [AuthGuard],
    data: { role: ['admin']}},
    { path: 'vente', component: AchatAdminComponent, 
    canActivate: [AuthGuard],
    data: { role: ['admin']} },
    { path: 'details/:id', component: DetailsComponent, 
    canActivate: [AuthGuard],
    data: { role: ['admin']} },
    { path: 'vente__valide', component: VenteComponent, 
    canActivate: [AuthGuard],
    data: { role: ['admin']} },
    { path: 'client', component: ClientComponent, 
    canActivate: [AuthGuard],
    data: { role: ['admin']} },
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
