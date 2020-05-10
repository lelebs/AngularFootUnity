import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateViewModel } from '../update.viewmodel';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UpdateService } from './update.service';
import '@progress/kendo-ui';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit, OnDestroy {
    model: UpdateViewModel;
    form: FormGroup;
    destroy = new Subject;
    inserindo = true;
    errors = [];
    rotina = "Leitor - Inserindo";
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private service: UpdateService,
        private router: Router
    ){

    }

    ngOnDestroy(): void {
        this.destroy.next();
    }

    ngOnInit(): void {
        if(this.route.snapshot.data.Alterando){
            this.alterando(this.route.snapshot.data.content);
        }
        else{
            this.model = new UpdateViewModel();
        }

        this.form = this.formBuilder.group({
            id: [ { value: this.model.id, disabled: true}, [ Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
            descricao: [ this.model.descricao, [ Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
            macAddress: [ this.model.macAddress, [ Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
        })

        this.form.controls['descricao'].valueChanges.pipe(takeUntil(this.destroy)).subscribe(value => this.model.descricao = value);
        this.form.controls['macAddress'].valueChanges.pipe(takeUntil(this.destroy)).subscribe(value => this.model.macAddress = value);
    }

    alterando(data){
        this.inserindo = false;
        this.rotina = "Leitor - Alterando";
        this.model = Object.assign(new UpdateViewModel(), data);
    }

    async onSubmit(){
        if(this.inserindo)
            await this.service.inserir(this.model).then(() => this.router.navigate([''])).catch(() => this.errors = ["Ocorreu um erro ao inserir"]);
        else
            await this.service.alterar(this.model).then(() => this.router.navigate([''])).catch(() => this.errors = ["Ocorreu um erro ao alterar"]);
    }

    onCancel() {
        this.router.navigate([""]);  
    } 
}