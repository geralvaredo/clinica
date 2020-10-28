import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
   user = 'usuario';
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  constructor(private auth: AuthService, private router: Router) {
  }


  checkLogin(url: string): boolean {
    if (this.auth.getStorage(this.user) !== null ) { return true; }
    this.router.navigate(['/login']);
    return false;
  }





}
