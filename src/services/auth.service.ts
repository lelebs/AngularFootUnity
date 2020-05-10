import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthModel, TipoAcesso } from 'src/app/routes/login/login.viewmodel';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        let session = sessionStorage.getItem(environment.authKey);
        if(session && this.isAdmin()){
            return true;
        }
        else if(!session)
            this.router.navigate(['login']);
        
        else
            this.router.navigate(['unnauthorized']);
        
        return false;
    }

    isLogged(){
        let session = sessionStorage.getItem(environment.authKey);
        if(session)
            return true;
        else 
            return false;
    }

    isAdmin(){
        let auth = <AuthModel> JSON.parse(sessionStorage.getItem(environment.authKey));

        return auth.tipoAcesso == TipoAcesso.Admin || auth.tipoAcesso == TipoAcesso.Mod;
    }

    getAuth(){
        return <AuthModel> JSON.parse(sessionStorage.getItem(environment.authKey));
    }
}