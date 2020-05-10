import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from './login.viewmodel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    tokenLogin = "loginFootAPIToken";
    auth = "authKey"


    constructor(private httpClient: HttpClient) { 

    }

    async logar(login: LoginModel) {
        return await this.httpClient.post(`${environment.urlAPIAuth}/generatetoken`, login, { headers: { 'Access-Control-Allow-Origin': '*' }})
            .toPromise();
    }

    async gerarToken(login){
    }
}