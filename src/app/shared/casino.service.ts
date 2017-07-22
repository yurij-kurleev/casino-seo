import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {Casino} from '../models/casino';
import {Banner} from '../models/banner';
import {ICasinoTable} from '../models/casinoTable';

@Injectable()
export class CasinoService {
    private baseUrl = 'http://77.220.213.35:8080/v1/casino/';
    private casinoRowBaseUrl = 'http://77.220.213.35:8080/v1/casinoRow/';

    constructor(private _http: Http) {
    }

    public getAllCasinos(): Promise<Casino[]> {
        return this._http.get(this.baseUrl + 'getAll')
            .toPromise()
            .then((response) => {
                const body = response.json().data;
                const casinos: Casino[] = [];
                for (const casino of body) {
                    casinos.push(new Casino(casino.logo_image, casino.bonus_text,
                        casino.description, casino.getBonus_link, casino.casino_link,
                        casino.name, casino.position, this.retrieveBanner(casino.banner),
                        casino._id, casino.casinoRows));
                }
                return Promise.resolve(casinos);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }

    public getOneCasino(id: string): Promise<Casino> {
        return this._http.get(this.baseUrl + 'get/' + id)
            .toPromise()
            .then((response) => {
                const body = response.json().data;
                console.log(body);
                const casino = new Casino(
                    body.logo_image,
                    body.bonus_text,
                    body.description,
                    body.getBonus_link, body.casino_link,
                    body.name,
                    body.position,
                    this.retrieveBanner(body.banner),
                    body._id,
                    body.casinoRows
                );
                return Promise.resolve(casino);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }

    public addCasino(data: Casino, file: File) {
        const headers = new Headers();
        headers.append('enctype', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        const options = new RequestOptions({ headers: headers });
        const payload = new FormData();
        payload.append('file', file, file.name);
        payload.append('data', JSON.stringify(data));
        return this._http.post(this.baseUrl + 'create', payload, options)
            .toPromise()
            .then((response) => {
                const body = response.json().data;
                const casino = new Casino(body.logo_image, body.bonus_text,
                    body.description, body.getBonus_link, body.casino_link,
                    body.name, body.position, this.retrieveBanner(body.banner), body._id);
                return Promise.resolve(casino);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }

    public updateCasino(data: Casino, file: File, id: string) {
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
                const casino = new Casino(body.logo_image, body.bonus_text,
                    body.description, body.getBonus_link, body.casino_link,
                    body.name, body.position, this.retrieveBanner(body.banner), body._id);
                return Promise.resolve(casino);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }

    public updateAllCasinosPosition(data: Array<any>) {
        this._http.put(this.baseUrl + 'updateAllPositions', data)
            .toPromise()
            .then((response) => {
                const body = response.json().data;
            })
            .catch((error) => {
                console.log(error);
            })
    }

    public deleteCasino(id: string) {
        return this._http.delete(this.baseUrl + 'delete/' + id)
            .toPromise()
            .then((response) => {
                const body = response.json().data;
                const casino = new Casino(body.logo_image, body.bonus_text,
                    body.description, body.getBonus_link, body.casino_link,
                    body.name, body.position, this.retrieveBanner(body.banner), body._id);
                return Promise.resolve(casino);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }

    public addCasinoTableRow(data: any): Promise<any[]> {
        const payload = {
            key: data.key,
            value: data.value,
            casino_id: data.casino_id
        };
        return this._http.post(this.casinoRowBaseUrl + 'create', payload)
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

    public updateCasinoTableRow(data: any, id: string): Promise<any[]> {
        return this._http.put(this.casinoRowBaseUrl + 'update/' + id, data)
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

    public deleteCasinoTableRow (id: string) {
        return this._http.delete(this.casinoRowBaseUrl + 'delete/' + id)
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

    private retrieveBanner (data: any): Banner {
        return (data) ?
            new Banner(data.text, data.image_link, data.casino_id, data._id) : new Banner();
    }
}
