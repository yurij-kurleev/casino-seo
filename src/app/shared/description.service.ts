import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Description} from '../models/description';

@Injectable()
export class DescriptionService {
    private baseUrl = 'http://77.220.213.35:8080/v1/description/';

    constructor(private _http: Http) {
    }

    public getAllDescriptions(): Promise<Description[]> {
        return this._http.get(this.baseUrl + 'getAll')
            .toPromise()
            .then((response) => {
                const body = response.json().data;
                const descriptions: Description[] = [];
                for (const item of body) {
                    descriptions.push(new Description(item.type, item.text, item._id));
                }
                return Promise.resolve(descriptions);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }

    public getOneDescription(id: string): Promise<Description> {
        return this._http.get(this.baseUrl + 'get/' + id)
            .toPromise()
            .then((response) => {
                const body = response.json().data;
                const description = new Description(body.type, body.text, body._id);
                return Promise.resolve(description);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }

    public addDescription(data: Description) {
        return this._http.post(this.baseUrl + 'create', data)
            .toPromise()
            .then((response) => {
                const body = response.json().data;
                const description = new Description(body.type, body.text, body._id);
                console.log(description);
                return Promise.resolve(description);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }

    public updateDescription(data: Description, id: string) {
        return this._http.put(this.baseUrl + 'update/' + id, data)
            .toPromise()
            .then((response) => {
                const body = response.json().data;
                const description = new Description(body.type, body.text, body._id);
                return Promise.resolve(description);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }

    public deleteDescription(id: string) {
        return this._http.delete(this.baseUrl + 'delete/' + id)
            .toPromise()
            .then((response) => {
                const body = response.json().data;
                const description = new Description(body.type, body.text, body._id);
                return Promise.resolve(description);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }
}
