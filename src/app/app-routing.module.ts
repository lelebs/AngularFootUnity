import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './routes/login/login.component';
import { AparelhosComponent } from './aparelhos/aparelhos.component';
import { AuthService } from 'src/services/auth.service';
import { UnnauthorizedComponent } from './routes/unnauthorized/unnauthorized.component';
import { UpdateResolver } from './aparelhos/components/update/update.service';
import { UpdateComponent } from './aparelhos/components/update/update.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: AparelhosComponent, canActivate: [AuthService] },
    { path: 'aparelhos/alterar/:id', component: UpdateComponent, canActivate: [AuthService], resolve: { content: UpdateResolver }, data: { Alterando: true } },
    { path: 'aparelhos/inserir', component: UpdateComponent, canActivate: [AuthService] },
    { path: 'unnauthorized', component: UnnauthorizedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule { }
