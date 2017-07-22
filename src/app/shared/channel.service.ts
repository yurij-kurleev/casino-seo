import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Channel} from '../models/channel';

@Injectable()
export class ChannelService {
    private baseUrl = 'http://77.220.213.35:8080/v1/channel/';

    constructor(private _http: Http) {
    }

    public getAllChannels(): Promise<Channel[]> {
        return this._http.get(this.baseUrl + 'getAll')
            .toPromise()
            .then((response) => {
                const body = response.json().data;
                console.log(body);
                const channels: Channel[] = [];
                for (const item of body) {
                    channels.push(new Channel(item.description, item.link, item.name,
                        item.type, item._id));
                }
                return Promise.resolve(channels);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }

    public getOneChannel(id: string): Promise<Channel> {
        return this._http.get(this.baseUrl + 'get/' + id)
            .toPromise()
            .then((response) => {
                const body = response.json().data;
                const channel = new Channel(body.description, body.link, body.name,
                    body.type, body._id);
                return Promise.resolve(channel);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }

    public addChannel(data: Channel): Promise<Channel> {
        return this._http.post(this.baseUrl + 'create', data)
            .toPromise()
            .then((response) => {
                const body = response.json().data;
                const channel = new Channel(body.description, body.link, body.name,
                    body.type, body._id);
                return Promise.resolve(channel);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }

    public updateChannel(data: Channel, id: string) {
        return this._http.put(this.baseUrl + 'update/' + id, data)
            .toPromise()
            .then((response) => {
                const body = response.json().data;
                const channel = new Channel(body.description, body.link, body.name,
                    body.type, body._id);
                return Promise.resolve(channel);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }

    public deleteChannel(id: string) {
        return this._http.delete(this.baseUrl + 'delete/' + id)
            .toPromise()
            .then((response) => {
                const body = response.json().data;
                const channel = new Channel(body.description, body.link, body.name,
                    body.type, body._id);
                return Promise.resolve(channel);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }
}
