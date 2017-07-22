import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/streamer.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Streamer} from '../models/streamer';

@Component({
    selector: 'app-streamers-page',
    templateUrl: './streamers-page.component.html',
    styleUrls: [
        './streamers-page.component.css',
        '../global.styles.css'
        ]
})
export class StreamersPageComponent implements OnInit {
    public streamer = new Streamer();

    constructor(
        private _streamerService: UserService,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this._streamerService.getOneStreamer(params['id'])
                .then((streamer) => {
                    this.streamer = streamer;
                })
                .catch((error) => {
                    console.log(error);
                })
        });
    }


}
