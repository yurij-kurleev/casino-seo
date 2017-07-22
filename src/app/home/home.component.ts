import {Component, OnInit} from '@angular/core';
import {Stream} from '../models/stream';
import {StreamService} from '../shared/stream.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: [
        './home.component.css',
        '../global.styles.css'
    ]
})
export class HomeComponent implements OnInit {
    public streams: Stream[] = [];
    public shadowedStreams = [];

    constructor(private _streamService: StreamService) {
    }

    ngOnInit() {
        this.getAllShadowedStreams();
    }

    public getAllStreams() {
        this._streamService.getAllStreams()
            .then((streams) => {
                this.streams = streams
                    .filter((s) => !this.shadowedStreams
                        .find((ss) => ss.excepted_id === s.idStream));
                console.log(this.streams.length);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    public getAllShadowedStreams () {
        this._streamService.getShadowedStreamIdS()
            .then((streams) => {
                this.shadowedStreams = streams;
                this.getAllStreams();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    public detectVideoSource(stream: Stream) {
        this._streamService.comesFrom = (stream.streamLink.search('twitch') !== -1) ?
            'twitch' : 'youtube';
    }
}
