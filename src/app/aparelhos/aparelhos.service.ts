import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/internal/operators/map';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AparelhosService extends BehaviorSubject<GridDataResult> implements OnDestroy {
    destroy = new Subject();

    constructor(private http: HttpClient) {
        super(null);
    }
    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }

    private _obterGrid(){
        var reqHeader = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem(environment.tokenKey).replace('"', ''),
            'Access-Control-Allow-Origin': '*'
        });
        return this.http.get(`${environment.urlAPIFoot}/leitor/obtergridleitores`, { headers: reqHeader }).pipe(
            map((response: { data: any, total: number}) => (<GridDataResult>{
                data: response.data,
                total: response.total
            }))
        );
    }

    obterGrid(){
        return this._obterGrid().pipe(takeUntil(this.destroy)).subscribe(r => super.next(r));
    }
}
