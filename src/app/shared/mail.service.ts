import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class MailService {
    private baseUrl = 'http://77.220.213.35:8080/v1/mail/send';

    constructor(private _http: Http) {
    }

    public sendMail(data: any): Promise<any> {
        return this._http.post(this.baseUrl, data)
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
