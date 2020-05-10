import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginModel } from './login.viewmodel';
import { LoginService } from './login.service';
import { take, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    model: LoginModel;
    errors: string[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private loginService: LoginService,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        if(this.authService.isLogged())
            this.router.navigate([""]);

        this.model = new LoginModel();

        this.form = this.formBuilder.group({
            Email: [ this.model.Email, [ Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
            Password: [ this.model.Password, [ Validators.required, Validators.maxLength(50), Validators.minLength(3)]]
        })

        this.form.controls['Email'].valueChanges.subscribe((value: string) => this.model.Email = value);
        this.form.controls['Password'].valueChanges.subscribe((value: string) => this.model.Password = value);
    }

    async onSubmit(){
        this.errors = [];
        if(this.validarModel()){
            await this.loginService.logar(this.model).then((retorno: {token: any, auth: any}) => {
                sessionStorage.clear();
                sessionStorage.setItem(environment.tokenKey, retorno.token);
                sessionStorage.setItem(environment.authKey, JSON.stringify(retorno.auth));
            },
            () => this.handleError("Ocorreu um erro ao realizar login. Verifique suas credenciais"));
            if(this.authService.isAdmin)
                this.router.navigate([""]);
        }
    }

    validarModel(): boolean {
        if(this.model.Email == (undefined || null || ''))
            this.errors.push('Email deve ser preenchido');
        
        if(this.model.Password == (undefined || null || ''))
            this.errors.push('Password deve ser preenchido');

        return this.errors.length === 0;
    }

    handleError(error: string){
        this.errors = [];
        this.errors.push(error);
    }
}
