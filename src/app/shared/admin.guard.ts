import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Injectable()
export class AdminGuard implements CanActivate {
    public constructor(private _cookieService: CookieService, private _router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
        return this.checkLogin();
    }

    checkLogin(): boolean {
        if (this._cookieService.getObject('admin')) {
            return true;
        }
        // Navigate to the login page with extras
        this._router.navigate(['/auth']);
        return false;
    }
}
