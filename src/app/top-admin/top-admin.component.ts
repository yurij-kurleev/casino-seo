import {Component, NgZone, OnInit} from '@angular/core';
import {Streamer} from '../models/streamer';
import {UserService} from '../shared/streamer.service';
import {ChannelService} from '../shared/channel.service';
import {Channel} from '../models/channel';
import {DragulaService} from 'ng2-dragula';

declare var $: any;

@Component({
    selector: 'app-top-admin',
    templateUrl: './top-admin.component.html',
    styleUrls: [
        './top-admin.component.css',
        '../global.styles.css'
        ]
})
export class TopAdminComponent implements OnInit {
    public streamers: Streamer[] = [];
    public channels: Channel[] = [];
    public newStreamer: Streamer = new Streamer();
    public topStreamers: Streamer[] = [];
    public isChangingStreamer = false;
    public newTopStreamer: Streamer;
    public errorMsg: string;
    public prevTopStreamerIndex = 0;
    public curTopStreamerIndex = 0;

    constructor(
        private _userService: UserService,
        private _channelService: ChannelService,
        private dragulaService: DragulaService,
        private zone: NgZone
    ) {
        this.zone.run(() => {
            dragulaService.drag.subscribe((value) => {
                this.prevTopStreamerIndex = this.getIndexInParent(value[1]);
            });
            dragulaService.drop.subscribe((value) => {
                this.curTopStreamerIndex = this.getIndexInParent(value[1]);
                this.topStreamers[this.curTopStreamerIndex].position = this.curTopStreamerIndex;
                if (this.curTopStreamerIndex > this.prevTopStreamerIndex) {
                    for (let i = this.prevTopStreamerIndex; i < this.curTopStreamerIndex; i++) {
                        this.topStreamers[i].position--;
                    }
                } else {
                    for (let i = this.curTopStreamerIndex + 1; i <= this.prevTopStreamerIndex; i++) {
                        this.topStreamers[i].position++;
                    }
                }
                const payload = [];
                for (const topUser of this.topStreamers) {
                    payload.push({streamer_id: topUser.id, position: topUser.position})
                }
                this.updateAllUsersPosition(payload);
            });
        });
    }

    ngOnInit() {
        this.getAllUsers();
        this.getAllChannels();
    }

    public updateAllUsersPosition (data: Array<any>) {
        this._userService.updateAllStreamersPosition(data);
    }

    public getUnusedUsers() {
        return this.streamers.filter((user) => user.position > 12);
    }

    public getAllUsers() {
        this._userService.getAllStreamers()
            .then((streamers) => {
                this.streamers = streamers;
                this.topStreamers = streamers
                    .filter((user) => user.position < 12)
                    .sort(this.compare);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    public getAllChannels() {
        this._channelService.getAllChannels()
            .then((channels) => {
                this.channels = channels;
            })
            .catch((error) => {
                console.log(error)
            })
    }

    public getChannelWithoutOwner() {
        return this.channels.filter((c) => !this.streamers.find((s) => s.channel_id === c.id));
    }

    public isValidForm(): boolean {
        for (let i in this.newStreamer) {
            if (!this.newStreamer[i] && (i === 'nick' || i === 'login' || i === 'channel_id')) {
                this.errorMsg = 'Empty ' + i;
                return false;
            }
        }
        const input = <HTMLInputElement>document.getElementById('file');
        if (!input.files[0]) {
            this.errorMsg = 'Add picture!';
            return false;
        }
        return true;
    }

    public addUser () {
        if (this.isValidForm()) {
            $('#banner-modal').modal('hide');
            const input = <HTMLInputElement>document.getElementById('file');
            const file = input.files[0];
            this._userService.addStreamer(this.newStreamer, file)
                .then((streamer) => {
                    this.streamers.push(streamer);
                })
                .catch((error) => console.log(error));
        } else {
            alert(this.errorMsg);
        }
    }

    public updateUser() {
        if (this.isValidForm()) {
            $('#banner-modal').modal('hide');
            const input = <HTMLInputElement>document.getElementById('file');
            const file = input.files[0];
            this._userService.updateStreamer(this.newStreamer, file, this.newStreamer.id)
                .then((streamer) => {
                    const oldStreamer = this.streamers.find((s) => s.id === streamer.id);
                    const oldStreamerIndex = this.streamers.indexOf(oldStreamer);
                    if (oldStreamerIndex !== -1) {
                        this.streamers[oldStreamerIndex] = streamer;
                    }
                })
                .catch((error) => console.log(error));
        } else {
            alert(this.errorMsg);
        }
    }

    public deleteUser(id: string) {
        const decision = confirm('Are you sure?');
        if (decision) {
            this._userService.deleteStreamer(id)
                .then((streamer) => {
                    const oldUser = this.streamers.find((s) => s.id === streamer.id);
                    const oldUserIndex = this.streamers.indexOf(oldUser);
                    if (oldUserIndex !== -1) {
                        this.streamers.splice(oldUserIndex, 1);
                    }
                })
                .catch((error) => console.log(error));
        }
    }

    public addTopUser(streamer: Streamer) {
        streamer.position = this.topStreamers.length;
        this._userService.updateStreamer(streamer, null, streamer.id)
            .then((topUser) => {
                this.topStreamers.push(topUser);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    public deleteTopUser(streamer: Streamer) {
        const decision = confirm('Are you sure?');
        if (decision) {
            streamer.position = 20;
            this._userService.updateStreamer(streamer, null, streamer.id)
                .then((topStreamer) => {
                    const oldUser = this.topStreamers.find((tu) => tu.id === topStreamer.id);
                    const oldUserIndex = this.topStreamers.indexOf(oldUser);
                    if (oldUserIndex !== -1) {
                        this.topStreamers.splice(oldUserIndex, 1);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    public clearForm() {
        this.isChangingStreamer = false;
        this.newStreamer = new Streamer();
    }

    public findUserToUpdate(user: Streamer) {
        this.isChangingStreamer = true;
        this.newStreamer = user;
        $('#banner-modal').modal('show');
    }

    public isTopStreamer (streamer: Streamer) {
        return this.topStreamers.indexOf(streamer) !== -1;
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

    private getIndexInParent (el) {
        return Array.from(el.parentNode.children).indexOf(el)
    }
}
