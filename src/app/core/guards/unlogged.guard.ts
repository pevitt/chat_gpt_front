import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, createUrlTreeFromSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnloggedGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = localStorage.getItem('adviser.token');
    return !token ? true: createUrlTreeFromSnapshot(route, ['/']);
  }
  
}
