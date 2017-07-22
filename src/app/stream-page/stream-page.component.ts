import {Component, OnInit} from '@angular/core';
import {StreamService} from '../shared/stream.service';
import {Stream} from '../models/stream';
import {ActivatedRoute, Params} from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {DescriptionService} from '../shared/description.service';
import {Description} from '../models/description';

@Component({
    selector: 'app-stream-page',
    templateUrl: './stream-page.component.html',
    styleUrls: [
        './stream-page.component.css',
        '../global.styles.css'
    ]
})
export class StreamPageComponent implements OnInit {
    public stream: Stream;
    public description: Description;
    public streamId = '';

    constructor(private _streamService: StreamService,
                private _descriptionService: DescriptionService,
                private activatedRoute: ActivatedRoute,
                private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.streamId = params['id'];
        });
        this.getAllDescriptions();
    }

    public getStreamById(streamId: string): void {
        this._streamService.getOneStream(streamId)
            .then((stream) => {
                this.stream = stream;
            })
            .catch((error) => {
                console.log(error);
            })
    }

    public transform(url: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    public getAllDescriptions() {
        this._descriptionService.getAllDescriptions()
            .then((descriptions) => {
                const filteredDescriptions = descriptions
                    .filter((d) => d.type === 'stream');
                let index = Math.floor(Math.random() * filteredDescriptions.length);
                if (index < 0) {
                    index++;
                }
                if (index >= filteredDescriptions.length) {
                    index = filteredDescriptions.length - 1;
                }
                this.description = filteredDescriptions[index];
                this.getStreamById(this.streamId);
            })
            .catch((error) => {
                console.log(error);
            })
    }
}
