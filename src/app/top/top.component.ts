import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/streamer.service';
import {Streamer} from '../models/streamer';
import {Description} from '../models/description';
import {DescriptionService} from '../shared/description.service';

declare var $: any;

@Component({
    selector: 'app-hot',
    templateUrl: './top.component.html',
    styleUrls: [
        './top.component.css',
        '../global.styles.css'
    ]
})
export class TopComponent implements OnInit {
    public streamers: Streamer[] = [];
    public description: Description = new Description();

    constructor(private _userService: UserService,
                private _descriptionService: DescriptionService) {
    }

    ngOnInit() {
        this.getAllStreamers();
        this.getDescription();
    }

    public getAllStreamers() {
        this._userService.getAllStreamers()
            .then((streamers) => {
                this.streamers = streamers;
                this.streamers = this.streamers
                    .sort(this.compare);
                this.streamers = this.streamers.slice(0, 10);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    public getDescription() {
        this._descriptionService.getAllDescriptions()
            .then((response) => {
                const foundDescription = response
                    .find((description) => description.type === 'page_top_user');
                if (foundDescription) {
                    this.description = foundDescription;
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    public closeModal () {
        $('#no-stream-modal').modal('hide');
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
