import {Component, OnInit} from '@angular/core';
import {Casino} from '../models/casino';
import {CasinoService} from '../shared/casino.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
    selector: 'app-casino-info',
    templateUrl: './casino-info.component.html',
    styleUrls: [
        './casino-info.component.css',
        '../global.styles.css'
    ]
})
export class CasinoInfoComponent implements OnInit {
    public casino = new Casino();

    constructor(
        private _casinoService: CasinoService,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            const casinoId = params['id'];
            this.getCasinoById(casinoId);
        });
    }

    public getCasinoById(id: string): void {
        this._casinoService.getOneCasino(id)
            .then((casino) => {
                this.casino = casino;
            })
            .catch((error) => {
                console.log(error);
            })
    }

}
