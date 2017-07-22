import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import {Stream} from '../models/stream';

@Injectable()
export class StreamService {
    private baseUrl = 'http://77.220.213.35:8080/v1/stream/';
    private shadowBaseUrl = 'http://77.220.213.35:8080/v1/exceptedStream/';
    public comesFrom = '';

    constructor(private _http: Http) {
    }

    public getAllStreams(): Promise<Stream[]> {
        return this._http.get(this.baseUrl + 'getAll')
            .toPromise()
            .then((response) => {
                const body = response.json();
                const streams: Stream[] = [];
                if (body) {
                    for (const stream of body) {
                            streams.push(new Stream(stream.name, stream.text,
                                stream.logoImage.lg,
                                '', stream.streamLink, stream.idStream));
                    }
                }
                return Promise.resolve(streams);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }

    public getOneStream(id: string): Promise<Stream> {
        return this._http.get(this.baseUrl + 'get/' + id + '?comesFrom=' + this.comesFrom)
            .toPromise()
            .then((response) => {
                const body = response.json().data;
                console.log(response);
                const stream = new Stream(body.name, body.text, body.logoImage.lg,
                    '', body.streamLink, body.idStream);
                return Promise.resolve(stream);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }

    public shadowStream(id: string): Promise<string> {
        return this._http.post(this.shadowBaseUrl + 'create', {'excepted_id': id})
            .toPromise()
            .then((response) => {
                const body = response.json().data;
                return Promise.resolve(body);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }

    public unshadowStream(id: string): Promise<string> {
        return this._http.delete(this.shadowBaseUrl + 'delete/' + id)
            .toPromise()
            .then((response) => {
                const body = response.json().data;
                return Promise.resolve(body);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }

    public getShadowedStreamIdS () {
        return this._http.get(this.shadowBaseUrl + 'getAll/')
            .toPromise()
            .then((response) => {
                const body = response.json().data;
                return Promise.resolve(body);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }
}
