import {Component, OnInit} from '@angular/core';
import {MailService} from '../shared/mail.service';
import {CookieService} from 'angular2-cookie/core';

@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: [
        './contact-us.component.css',
        '../global.styles.css'
    ]
})
export class ContactUsComponent implements OnInit {
    public payload = {
        sender: {
            email: '',
            name: ''
        },
        message: ''
    };
    public errMsg = '';

    constructor(private _mailService: MailService, private _cookieService: CookieService) {
    }

    ngOnInit() {
    }

    public sendMail() {
        if (this.isValidForm(this.payload) && !this._cookieService.get('email')) {
            this._mailService.sendMail(this.payload)
                .then(() => {
                    this.payload = {
                        sender: {
                            email: '',
                            name: ''
                        },
                        message: ''
                    };
                    this._cookieService.put('email', 'sent');
                })
                .catch((error) => {
                    alert('Currently unable to send your message. Sorry :(')
                })
        } else {
            alert(this.errMsg);
        }
    }

    isValidForm(data: any): boolean {
        for (const i in this.payload) {
            if (i === 'sender') {
                this.isValidForm(data[i]);
            }
            if (!data[i]) {
                this.errMsg = 'Empty ' + i;
                return false;
            }
            if (i === 'email') {
                const emailTestResult = new RegExp(/.*@.*\./).test(data[i]);
                if (!emailTestResult) {
                    this.errMsg = 'Wrong email format';
                    return false;
                }
            }
        }
        return true;
    }
}
