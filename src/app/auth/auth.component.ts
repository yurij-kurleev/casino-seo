import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/streamer.service';
import {CookieService} from 'angular2-cookie/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: [
        './auth.component.css',
        '../global.styles.css'
    ]
})
export class AuthComponent implements OnInit {
    public token = '';

    constructor(
        private _userService: UserService,
        private _cookieService: CookieService,
        private _router: Router
    ) {
    }

    ngOnInit() {
    }

    public authorize() {
        this._userService.authorize(this.token)
            .then((user) => {
            console.log(user);
                if (user.role === 'admin') {
                    this._cookieService.putObject('admin', user);
                    this._router.navigate(['/admin/home']);
                } else {
                    alert('Wrong token!');
                }
            })
            .catch((error) => {
                if (error.status === 404) {
                    alert('Wrong token!');
                }
            })
    }

}
