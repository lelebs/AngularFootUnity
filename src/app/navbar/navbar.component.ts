import { Component, Input } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { AuthModel } from '../routes/login/login.viewmodel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    auth: AuthModel;
    @Input() errors: [];
    @Input() route: string;


    constructor(
        private authService: AuthService,
        private router: Router
    ) {
        this.auth = this.authService.getAuth();
    }

    onExit(){
        sessionStorage.clear();
        this.router.navigate(["login"])
    }
}
