import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import {User} from '../models/user';
import {Streamer} from '../models/streamer';

@Injectable()
export class UserService {
    private baseUrl = 'http://77.220.213.35:8080/v1/streamer/';
    private userBaseUrl = 'http://77.220.213.35:8080/v1/user/';

    constructor(private _http: Http) {
    }

    public getAllStreamers(): Promise<Streamer[]> {
        return this._http.get(this.baseUrl + 'getAll')
            .toPromise()
            .then((response) => {
                const body = response.json().data;
                const streamers: Streamer[] = [];
                for (const item of body) {
                    streamers.push(new Streamer(item.name,
                        item.description,
                        item.channel_id,
                        item.image_link,
                        item.position,
                        item.channel,
                        item._id,
                        item.activeStream));
                }
                return Promise.resolve(streamers);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }

    public getOneStreamer(id: string): Promise<Streamer> {
        return this._http.get(this.baseUrl + 'get/' + id)
            .toPromise()
            .then((response) => {
                const body = response.json().data;
                const streamer = new Streamer(
                    body.name,
                    body.description,
                    body.channel_id,
                    body.image_link,
                    body.position,
                    body.channel,
                    body._id,
                    body.activeStream
                );
                return Promise.resolve(streamer);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }

    public addStreamer(data: Streamer, file: File): Promise<Streamer> {
        const headers = new Headers();
        headers.append('enctype', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        const options = new RequestOptions({headers: headers});
        const payload = new FormData();
        payload.append('file', file, file.name);
        payload.append('data', JSON.stringify(data));
        return this._http.post(this.baseUrl + 'create', payload, options)
            .toPromise()
            .then((response) => {
                const body = response.json().data;
                const streamer = new Streamer(body.name,
                    body.description,
                    body.channel_id,
                    body.image_link,
                    body.position,
                    body.channel,
                    body._id);
                return Promise.resolve(streamer);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }

    public updateStreamer(data: Streamer, file: File, id: string) {
        const headers = new Headers();
        headers.append('enctype', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        const options = new RequestOptions({ headers: headers });
        const payload = new FormData();
        if (file) {
            payload.append('file', file, file.name);
        }
        payload.append('data', JSON.stringify(data));
        return this._http.put(this.baseUrl + 'update/' + id, payload, options)
            .toPromise()
            .then((response) => {
                const body = response.json().data;
                const streamer = new Streamer(body.name,
                    body.description,
                    body.channel_id,
                    body.image_link,
                    body.position,
                    body.channel,
                    body._id);
                return Promise.resolve(streamer);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }

    updateAllStreamersPosition(data: Array<any>) {
        this._http.put(this.baseUrl + 'updateAllPositions', data)
            .toPromise()
            .then((response) => {
                const body = response.json().data;
            })
            .catch((error) => {
                console.log(error);
            })
    }

    public deleteStreamer(id: string) {
        return this._http.delete(this.baseUrl + 'delete/' + id)
            .toPromise()
            .then((response) => {
                const body = response.json().data;
                const streamer = new Streamer(body.name,
                    body.description,
                    body.channel_id,
                    body.image_link,
                    body.position,
                    body.channel,
                    body._id);
                return Promise.resolve(streamer);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }

    public authorize(token: string) {
        return this._http.post(this.userBaseUrl + 'admin/login', {token: token})
            .toPromise()
            .then((response) => {
                const body = response.json().data;
                let user = new User();
                if (body) {
                    user = new User(body.login, body.nick, body.channel_id, body.image_link,
                        body.registration_date, body.contacts, body.channel, body.first_name,
                        body.last_name, body._id, body.role, body.position);
                }
                return Promise.resolve(user);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }
}
