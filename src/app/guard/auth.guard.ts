import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthenticationService , private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> {
    const expectedRoles = next.data['role']; 
    const user = this.authService.user;
    if (user && user.role && expectedRoles.includes(user.role)) {      
      return true; 
    } else {
      // Rediriger vers une page d'erreur
      return this.router.createUrlTree(['/access-denied']);
    }
  }
}