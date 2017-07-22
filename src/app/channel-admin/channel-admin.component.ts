import {Component, OnInit} from '@angular/core';
import {Channel} from '../models/channel';
import {ChannelService} from '../shared/channel.service';

declare var $: any;

@Component({
    selector: 'app-channel-admin',
    templateUrl: './channel-admin.component.html',
    styleUrls: [
        './channel-admin.component.css',
        '../global.styles.css'
    ]
})
export class ChannelAdminComponent implements OnInit {
    public channels: Channel[] = [];
    public newChannel = new Channel();
    public isChangingChannel = false;
    public errorMsg: string;

    constructor(private _channelService: ChannelService) {
    }

    ngOnInit() {
        this.getAllChannels();
    }

    public getAllChannels(): void {
        this._channelService.getAllChannels()
            .then((channels) => {
                this.channels = channels;
            })
            .catch((error) => {
                console.log(error);
            })
    }

    public isValidForm(): boolean {
        for (let i in this.newChannel) {
            if (!this.newChannel[i] && i !== 'id' && i !== 'type') {
                this.errorMsg = 'Empty ' + i;
                return false;
            }
            if (i === 'link') {
                if (!this.checkUrl(this.newChannel[i])) {
                    this.errorMsg = 'Incorrect ' + i + '. It should be like: http://example.com';
                    return false;
                }
            }
        }
        return true;
    }

    public addChannel(): void {
        if (this.isValidForm()) {
            $('#login-modal').modal('hide');
            this.newChannel.type = this.newChannel.link.search('twitch') !== -1 ? 'twitch' : 'youtube';
            this._channelService.addChannel(this.newChannel)
                .then((channel) => {
                    this.channels.push(channel);
                })
                .catch((error) => console.log(error));
        } else {
            alert(this.errorMsg);
        }
    }

    public updateChannel(): void {
        if (this.isValidForm()) {
            $('#login-modal').modal('hide');
            this.newChannel.type = this.newChannel.link.search('twitch') !== -1 ? 'twitch' : 'youtube';
            this._channelService.updateChannel(this.newChannel, this.newChannel.id)
                .then((channel) => {
                    const oldChannel = this.channels.find((c) => c.id === channel.id);
                    const oldChannelIndex = this.channels.indexOf(oldChannel);
                    if (oldChannelIndex !== -1) {
                        this.channels[oldChannelIndex] = channel;
                    }
                })
                .catch((error) => console.log(error));
        } else {
            alert(this.errorMsg);
        }
    }

    public deleteChannel(id: string): void {
        const decision = confirm('Are you sure?');
        if (decision) {
            this._channelService.deleteChannel(id)
                .then((channel) => {
                    const oldChannel = this.channels.find((c) => c.id === channel.id);
                    const oldChannelIndex = this.channels.indexOf(oldChannel);
                    if (oldChannelIndex !== -1) {
                        this.channels.splice(oldChannelIndex, 1);
                    }
                })
                .catch((error) => console.log(error));
        }
    }

    public findChannelToUpdate(channel: Channel): void {
        this.isChangingChannel = true;
        this.newChannel = this.channels.find((c) => c.id === channel.id);
    }

    public clearForm(): void {
        this.isChangingChannel = false;
        this.newChannel = new Channel();
    }

    private checkUrl(url: string): boolean {
        return new RegExp(/^http(s)?:\/\/.+/).test(url);
    }
}
