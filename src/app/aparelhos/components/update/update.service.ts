import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

    constructor(private http: HttpClient) { }

    reqHeader = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem(environment.tokenKey).replace('"', ''),
        'Access-Control-Allow-Origin': '*'
    });

    async obterPrincipal(id){
        return await this.http.get(`${environment.urlAPIFoot}/leitor/obterleitor/${id}`, { headers: this.reqHeader}).toPromise();
    }

    async inserir(model){
        return await this.http.post(`${environment.urlAPIFoot}/leitor/inserirleitor`, JSON.stringify(model), { headers: this.reqHeader }).toPromise();
    }

    async alterar(model){
        return await this.http.post(`${environment.urlAPIFoot}/leitor/alterarleitor`, JSON.stringify(model), { headers: this.reqHeader }).toPromise();
    }
}



@Injectable({
    providedIn: 'root'
})
export class UpdateResolver implements Resolve<any> {

    constructor(
        private service: UpdateService
    )
    { }
    async resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
        return await this.service.obterPrincipal(route.params.id).then(retorno => {
            return retorno;
        });
    }
    
}