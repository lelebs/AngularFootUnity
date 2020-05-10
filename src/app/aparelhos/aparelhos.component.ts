import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { AparelhosService } from './aparelhos.service';
import { Router } from '@angular/router';

declare var kendo: any;

@Component({
  selector: 'app-aparelhos',
  templateUrl: './aparelhos.component.html',
  styleUrls: ['./aparelhos.component.scss']
})
export class AparelhosComponent implements OnInit, AfterViewInit {
    view: Observable<GridDataResult>;
    showModal = false;
    qrCodeData = "";
    descricaoQrCode = "";
    errors = [];
    
    @ViewChild('qrCode', {static: false}) private qrCodeElement;
    public qrCode;
    constructor(
        private aparelhosService: AparelhosService,
        private router: Router
    ) {
        this.view = aparelhosService
    }
    ngAfterViewInit(): void {
        this.onFilter();
    }

    ngOnInit(): void {

    }

    onAdd(){
        this.router.navigate(["aparelhos/inserir"]);
    };
    onFilter(){
        this.aparelhosService.obterGrid();
    }

    onUpdate(dataItem){
        this.router.navigate(['aparelhos/alterar/'+ dataItem.macAddress]);
    }

    
    onQrCode(dataItem){
        this.showModal = true;
        this.descricaoQrCode = dataItem.descricao;
        this.qrCodeData = dataItem.macAddress;
    }

    onDownload(){
        const fileName: string = `QRCode ${this.descricaoQrCode}.png`;
        const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

        a.href = document.getElementsByTagName('img')[0].src;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
    }
}
