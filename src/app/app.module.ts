import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './routes/login/login.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { HttpClientModule } from '@angular/common/http'
import { LoginService } from './routes/login/login.service';
import { AparelhosComponent } from './aparelhos/aparelhos.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { UnnauthorizedComponent } from './routes/unnauthorized/unnauthorized.component';
import { UpdateComponent } from './aparelhos/components/update/update.component';
import { NavbarComponent } from './navbar/navbar.component';
import { QRCodeModule } from 'angularx-qrcode';
import { DialogsModule } from '@progress/kendo-angular-dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AparelhosComponent,
    UnnauthorizedComponent,
    UpdateComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ButtonsModule,
    HttpClientModule,
    GridModule,
    QRCodeModule,
    DialogsModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
