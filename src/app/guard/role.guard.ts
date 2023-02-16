import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../service/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private matSnackBar: MatSnackBar) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

       if(!!route.data['role']) {
         const routeRoles = route.data['role'];

         const userRoles = this.authService.getRoles();

         if(userRoles.includes(routeRoles)) {
           return true;
         } else {
           this.matSnackBar.open("У вас нет доступа к этой странице!", "Ладно",
             {
               duration: 3000,
             });
         }

       }
    return false;
  }

}
