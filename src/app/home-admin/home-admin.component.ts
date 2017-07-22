import {Component, OnInit} from '@angular/core';
import {StreamService} from '../shared/stream.service';
import {Stream} from '../models/stream';
import {CasinoService} from '../shared/casino.service';
import {Casino} from '../models/casino';
import {DragulaService} from 'ng2-dragula';

@Component({
    selector: 'app-home-admin',
    templateUrl: './home-admin.component.html',
    styleUrls: [
        './home-admin.component.css',
        '../home/home.component.css',
        '../global.styles.css'
    ]
})

export class HomeAdminComponent implements OnInit {
    public casinos: Casino[] = [];
    public topCasinos: Casino[] = [];
    public newTopCasino: Casino;
    public streams: Stream[] = [];
    public prevTopCasinoIndex = 0;
    public curTopCasinoIndex = 0;
    public shadowedStreams = [];

    constructor(private _streamService: StreamService,
                private _casinoService: CasinoService,
                private dragulaService: DragulaService) {
        dragulaService.drag.subscribe((value) => {
            this.prevTopCasinoIndex = this.getIndexInParent(value[1]);
        });
        dragulaService.drop.subscribe((value) => {
            this.curTopCasinoIndex = this.getIndexInParent(value[1]);
            this.topCasinos[this.curTopCasinoIndex].position = this.curTopCasinoIndex;
            if (this.curTopCasinoIndex > this.prevTopCasinoIndex) {
                for (let i = this.prevTopCasinoIndex; i < this.curTopCasinoIndex; i++) {
                    this.topCasinos[i].position--;
                }
            } else {
                for (let i = this.curTopCasinoIndex + 1; i <= this.prevTopCasinoIndex; i++) {
                    this.topCasinos[i].position++;
                }
            }
            const payload = [];
            for (const topCasino of this.topCasinos) {
                payload.push({casino_id: topCasino.id, position: topCasino.position})
            }
            this.updateAllCasinosPosition(payload);
        });
    }

    ngOnInit() {
        this.getShadowedIds();
        this.getAllCasinos();
    }

    public getAllStreams(): void {
        this._streamService.getAllStreams()
            .then((streams) => {
                this.streams = streams;
            })
            .catch((error) => {
                console.log(error);
            })
    }

    public getAllCasinos(): void {
        this._casinoService.getAllCasinos()
            .then((casinos) => {
                this.casinos = casinos;
                this.topCasinos = casinos.filter((casino) => casino.position <= 12);
                this.topCasinos = this.topCasinos.sort(this.compare);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    public toggleStreamState (stream: Stream): void {
        const foundStream = this.shadowedStreams
            .find((ss) => ss.excepted_id === stream.idStream);
        const foundStreamIndex = this.shadowedStreams.indexOf(foundStream);
        if (foundStreamIndex !== -1) {
            this.unshadowStream(foundStream._id);
            this.shadowedStreams.splice(foundStreamIndex, 1);
        } else {
            this.shadowStream(stream);
        }
    }

    public isShadowedStream(stream: Stream): boolean {
        return !!(this.shadowedStreams && this.shadowedStreams.find((ss) => ss.excepted_id === stream.idStream));
    }

    public getUnusedCasinos() {
        return this.casinos.filter((casino) => casino.position > 12);
    }

    public addTopCasino(casino: Casino) {
        casino.position = this.topCasinos.length;
        this._casinoService.updateCasino(casino, null, casino.id)
            .then((topCasino) => {
                this.topCasinos.push(topCasino);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    public deleteTopCasino(casino: Casino) {
        const decision = confirm('Are you sure?');
        if (decision) {
            casino.position = 20;
            this._casinoService.updateCasino(casino, null, casino.id)
                .then((topCasino) => {
                    const oldCasino = this.topCasinos.find((tc) => tc.id === topCasino.id);
                    const oldCasinoIndex = this.topCasinos.indexOf(oldCasino);
                    if (oldCasinoIndex !== -1) {
                        this.topCasinos.splice(oldCasinoIndex, 1);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    public updateAllCasinosPosition (data: Array<any>) {
        this._casinoService.updateAllCasinosPosition(data);
    }

    public deleteAllShadowedStreams () {
        for (const ss of this.shadowedStreams) {
            if (ss._id) {
                this._streamService.unshadowStream(ss._id)
                    .then(() => {
                        console.log('success');
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    }

    private shadowStream (stream: Stream) {
        this._streamService.shadowStream(stream.idStream)
            .then((streamId) => {
                console.log(streamId);
                this.shadowedStreams.push(streamId);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    private unshadowStream (shadowedId: string) {
        console.log(shadowedId);
        this._streamService.unshadowStream(shadowedId)
            .then((streamId) => {
                console.log(streamId);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    private getIndexInParent (el) {
        return Array.from(el.parentNode.children).indexOf(el)
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

    private getShadowedIds () {
        this._streamService.getShadowedStreamIdS()
            .then((streamIds) => {
                console.log(streamIds);
                this.shadowedStreams = streamIds;
                this.getAllStreams();
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
