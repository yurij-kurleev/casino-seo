import {Component, OnInit} from '@angular/core';
import {Description} from '../models/description';
import {DescriptionService} from '../shared/description.service';
import {Casino} from '../models/casino';
import {CasinoService} from '../shared/casino.service';
import {ICasinoTable} from '../models/casinoTable';

@Component({
    selector: 'app-top-online-casino-admin',
    templateUrl: './top-online-casino-admin.component.html',
    styleUrls: [
        './top-online-casino-admin.component.css',
        '../global.styles.css'
        ]
})
export class TopOnlineCasinoAdminComponent implements OnInit {
    public casinos: Casino[] = [];
    public casino: Casino = new Casino();
    public descriptions: Description[] = [];
    public streamDescriptions: Description[] = [];
    public newStreamDescription: Description = new Description();
    public isOld: boolean[] = [];
    // public casinoTable = <ICasinoTable>{};
    public casinoTableRow = {key: '', value: '', casino_id: '', _id: ''};
    public isUpdateStreamDescription = false;
    public isUpdateCasinoTableRow = false;

    constructor(private _descriptionService: DescriptionService,
                private _casinoService: CasinoService) {
    }

    ngOnInit() {
        this.getAllDescriptions();
        this.getAllCasinos();
    }

    public getAllDescriptions() {
        this._descriptionService.getAllDescriptions()
            .then((response) => {
                for (const description of response) {
                    if (description.type !== 'stream') {
                        this.descriptions[description.type] = description;
                        this.isOld[description.type] = true;
                    } else {
                        this.streamDescriptions.push(description);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    public addDescription(type: string): void {
        this.descriptions[type].type = type;
        this._descriptionService.addDescription(this.descriptions[type])
            .then((response) => {
                this.isOld[type] = true;
                this.descriptions[type] = response;
            })
            .catch((error) => {
                console.log(error);
            })
    }

    public updateDescription(type: string): void {
        this._descriptionService
            .updateDescription(this.descriptions[type], this.descriptions[type].idDescription)
            .then((response) => {
                this.descriptions[type] = response;
            })
            .catch((error) => {
                console.log(error);
            })
    }

    public addNewArrayItemOnDemand($event, type: string) {
        if (!this.descriptions[type]) {
            this.descriptions[type] = new Description();
            this.descriptions[type].text = $event.target.value;
            this.descriptions[type].type = type;
        } else {
            this.descriptions[type].text = $event.target.value;
        }
    }

    public getAllCasinos() {
        this._casinoService.getAllCasinos()
            .then((casinos) => {
                this.casinos = casinos;
            })
            .catch((error) => {
                console.log(error);
            })
    }

    public onCasinoSelect(event) {
        this.casino = this.casinos.find((c) => c.id === event.target.value);
        console.log(this.casino);
    }

    public addCasinoTableRow() {
        this.casinoTableRow.casino_id = this.casino.id;
        this._casinoService.addCasinoTableRow(this.casinoTableRow)
            .then((casinoDescription) => {
                this.casino.casinoRows.push(casinoDescription);
                this.casinoTableRow = {key: '', value: '', casino_id: '', _id: ''};
            })
            .catch((error) => {
                console.log(error);
            })
    }

    public deleteCasinoTableRow(row) {
        const decision = confirm('Are you sure?');
        if (decision) {
            this.casinoTableRow.casino_id = this.casino.id;
            const oldRowIndex = this.casino.casinoRows
                .indexOf(row);
            this._casinoService.deleteCasinoTableRow(row._id)
                .then((casinoTableRow) => {
                    if (oldRowIndex !== -1) {
                        this.casino.casinoRows.splice(oldRowIndex, 1);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    public updateCasinoTableRow() {
        this._casinoService
            .updateCasinoTableRow(this.casinoTableRow, this.casinoTableRow._id)
            .then((casinoTableRow) => {
                const oldRow = this.casino.casinoRows
                    .find((r) => r._id === this.casinoTableRow._id);
                const oldRowIndex = this.casino.casinoRows.indexOf(oldRow);
                if (oldRowIndex !== -1) {
                    this.casino.casinoRows[oldRowIndex] = casinoTableRow;
                    this.casinoTableRow = {key: '', value: '', casino_id: '', _id: ''};
                    this.isUpdateCasinoTableRow = false;
                    console.log(this.isUpdateCasinoTableRow);
                }
            })
            .catch((error) => console.log(error));
    }

    public addStreamDescription() {
        this.newStreamDescription.type = 'stream';
        this._descriptionService.addDescription(this.newStreamDescription)
            .then((response) => {
                this.newStreamDescription = new Description();
                this.streamDescriptions.push(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    public findStreamDescriptionToUpdate(streamDescription: Description) {
        this.newStreamDescription = streamDescription;
        this.isUpdateStreamDescription = true;
    }

    public findCasinoTableRowToUpdate(row) {
        this.casinoTableRow = row;
        this.isUpdateCasinoTableRow = true;
    }

    public deleteStreamDescription(streamDescription: Description) {
        const decision = confirm('Are you sure?');
        if (decision) {
            const oldDescriptionIndex = this.streamDescriptions
                .indexOf(streamDescription);
            this._descriptionService.deleteDescription(streamDescription.idDescription)
                .then((description) => {
                    if (oldDescriptionIndex !== -1) {
                        this.streamDescriptions.splice(oldDescriptionIndex, 1);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    public updateStreamDescription() {
        this._descriptionService
            .updateDescription(this.newStreamDescription, this.newStreamDescription.idDescription)
            .then((description) => {
                const oldDescription = this.streamDescriptions
                    .find((d) => d.idDescription === description.idDescription);
                const oldDescriptionIndex = this.streamDescriptions.indexOf(oldDescription);
                if (oldDescriptionIndex !== -1) {
                    this.streamDescriptions[oldDescriptionIndex] = description;
                    this.newStreamDescription = new Description();
                    this.isUpdateStreamDescription = false;
                }
            })
            .catch((error) => console.log(error));
    }

    public cancelUpdateStreamDescription() {
        this.newStreamDescription = new Description();
        this.isUpdateStreamDescription = false;
    }

    public cancelUpdateCasinoTableRow() {
        this.casinoTableRow = {key: '', value: '', casino_id: '', _id: ''};
        this.isUpdateCasinoTableRow = false;
    }
}
