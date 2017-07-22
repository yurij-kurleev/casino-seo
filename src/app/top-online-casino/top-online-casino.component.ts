import {Component, OnInit} from '@angular/core';
import {Casino} from '../models/casino';
import {CasinoService} from '../shared/casino.service';
import {Description} from '../models/description';
import {DescriptionService} from '../shared/description.service';

@Component({
    selector: 'app-top-online-casino',
    templateUrl: './top-online-casino.component.html',
    styleUrls: [
        './top-online-casino.component.css',
        '../global.styles.css'
        ]
})
export class TopOnlineCasinoComponent implements OnInit {
    public casinos: Casino[] = [];
    public description: Description = new Description();

    constructor(
        private _casinoService: CasinoService,
        private _descriptionService: DescriptionService
    ) {}

    ngOnInit() {
        this.getAllCasinos();
        this.getDescription();
    }

    public getAllCasinos() {
        this._casinoService.getAllCasinos()
            .then((casinos) => {
                // this.casinos = casinos.filter((casino) => casino.position <= 20);
                this.casinos = casinos;
                this.casinos = this.casinos.sort(this.compare);
                this.casinos = this.casinos.slice(0, 5);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    public getDescription() {
        this._descriptionService.getAllDescriptions()
            .then((response) => {
                const foundDescription = response
                    .find((description) => description.type === 'page_top_casino');
                if (foundDescription) {
                    this.description = foundDescription;
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    private compare(a, b) {
        if (a.position < b.position) {
            return -1;
        }
        if (a.position > b.position) {
            return 1;
        }
        return 0;
    }
}
