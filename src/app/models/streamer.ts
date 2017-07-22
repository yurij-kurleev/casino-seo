import {IChannel} from './channel';

export interface IStreamer {
    id: string;
    name: string;
    description: string;
    channel_id: string;
    image_link: string;
    position: number;
    channel?: IChannel;
}

export class Streamer implements IStreamer {
    id: string;
    name: string;
    description: string;
    channel_id: string;
    image_link: string;
    position: number;
    channel?: IChannel;
    activeStream?: any;

    constructor(
        name?: string,
        description?: string,
        channel_id?: string,
        image_link?: string,
        position?: number,
        channel?: IChannel,
        id?: string,
        activeStream?: any
    ) {
        this.id = id || '';
        this.name = name || '';
        this.description = description || '';
        this.channel_id = channel_id || '';
        this.image_link = image_link || '';
        this.position = (position !== undefined) ? position : 20;
        this.channel = channel || <IChannel>{};
        this.activeStream = activeStream || {};
    }
}
