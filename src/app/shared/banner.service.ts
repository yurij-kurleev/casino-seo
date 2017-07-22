import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import {Banner} from '../models/banner';

@Injectable()
export class BannerService {
    private baseUrl = 'http://77.220.213.35:8080/v1/banner/';

    constructor(private _http: Http) {
    }

    public addBanner(data: Banner, file: File): Promise<Banner> {
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
                const banner = new Banner(body.text, body.image_link, body.casino_id, body._id);
                return Promise.resolve(banner);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }

    public getAllBanners(): Promise<Banner[]> {
        return this._http.get(this.baseUrl + 'getAll')
            .toPromise()
            .then((response) => {
                const body = response.json().data;
                const banners: Banner[] = [];
                for (const banner of body) {
                    banners.push(new Banner(banner.text, banner.image_link, banner.casino_id,
                        banner._id));
                }
                return Promise.resolve(banners);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }

    public deleteBanner(id: string) {
        return this._http.delete(this.baseUrl + 'delete/' + id)
            .toPromise()
            .then((response) => {
                const body = response.json().data;
                const banner = new Banner(body.text, body.image_link, body.casino_id,
                    body._id);
                return Promise.resolve(banner);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }
}
