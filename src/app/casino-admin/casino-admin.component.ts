import {Component, OnInit} from '@angular/core';
import {CasinoService} from '../shared/casino.service';
import {Casino} from '../models/casino';
import {Banner} from '../models/banner';
import {BannerService} from '../shared/banner.service';

declare var $: any;

@Component({
    selector: 'app-casino-admin',
    templateUrl: './casino-admin.component.html',
    styleUrls: [
        './casino-admin.component.css',
        '../global.styles.css'
    ]
})
export class CasinoAdminComponent implements OnInit {
    public casinos: Casino[] = [];
    public banners: Banner[] = [];
    public newCasino = new Casino();
    public newBanner = new Banner();
    public errorMsg: string;
    public isChangingCasino = false;

    constructor(
        private _casinoService: CasinoService,
        private _bannerService: BannerService,
    ) {
    }

    ngOnInit() {
        this.getAllCasinos();
        this.getAllBanners();
    }

    public getAllCasinos(): void {
        this._casinoService.getAllCasinos()
            .then((casinos) => {
                this.casinos = casinos;
            })
            .catch((error) => {
                console.log(error);
            })
    }

    public getAllBanners(): void {
        this._bannerService.getAllBanners()
            .then((banners) => {
                this.banners = banners;
                console.log(this.banners);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    public isValidForm(): boolean {
        for (let i in this.newCasino) {
            if (!this.newCasino[i] && i !== 'logo_image' && i !== 'id' && i !== 'position') {
                this.errorMsg = 'Empty ' + i;
                return false;
            }
            if (i === 'getBonus_link' || i === 'casino_link') {
                if (!this.checkUrl(this.newCasino[i])) {
                    this.errorMsg = 'Incorrect ' + i + '. It should be like: http://example.com';
                    return false;
                }
            }
        }
        return true;
    }

    public isValidBannerForm(): boolean {
        for (let i in this.newBanner) {
            if (!this.newBanner[i] && i !== 'image_link' && i !== 'id') {
                this.errorMsg = 'Empty ' + i;
                return false;
            }
        }
        return true;
    }

    public addCasino(): void {
        if (this.isValidForm()) {
            $('#login-modal').modal('hide');
            const input = <HTMLInputElement>document.getElementById('file');
            const file = input.files[0];
            this.newCasino.position = 15;
            this._casinoService.addCasino(this.newCasino, file)
                .then((casino) => {
                    this.casinos.push(casino);
                })
                .catch((error) => console.log(error));
        } else {
            alert(this.errorMsg);
        }
    }

    public findCasinoToUpdate(casino: Casino): void {
        this.isChangingCasino = true;
        this.newCasino = this.casinos.find((c) => c.id === casino.id);
    }

    public clearForm(): void {
        this.isChangingCasino = false;
        this.newCasino = new Casino();
    }

    public updateCasino(): void {
        if (this.isValidForm()) {
            $('#login-modal').modal('hide');
            const input = <HTMLInputElement>document.getElementById('file');
            const file = input.files[0];
            this._casinoService.updateCasino(this.newCasino, file, this.newCasino.id)
                .then((casino) => {
                    const oldCasino = this.casinos.find((c) => c.id === casino.id);
                    const oldCasinoIndex = this.casinos.indexOf(oldCasino);
                    if (oldCasinoIndex !== -1) {
                        this.casinos[oldCasinoIndex] = casino;
                    }
                })
                .catch((error) => console.log(error));
        } else {
            alert(this.errorMsg);
        }
    }

    public deleteCasino(id: string): void {
        const decision = confirm('Are you sure?');
        if (decision) {
            this._casinoService.deleteCasino(id)
                .then((casino) => {
                    const oldCasino = this.casinos.find((c) => c.id === casino.id);
                    const oldCasinoIndex = this.casinos.indexOf(oldCasino);
                    if (oldCasinoIndex !== -1) {
                        this.casinos.splice(oldCasinoIndex, 1);
                    }
                })
                .catch((error) => console.log(error));
        }
    }

    public addBanner () {
        if (this.isValidBannerForm()) {
            $('#banner-modal').modal('hide');
            const input = <HTMLInputElement>document.getElementById('banner');
            const file = input.files[0];
            this._bannerService.addBanner(this.newBanner, file)
                .then((banner) => {
                console.log(banner);
                    this.banners.push(banner);
                })
                .catch((error) => console.log(error));
        } else {
            alert(this.errorMsg);
        }
    }

    public deleteBanner(id: string): void {
        const decision = confirm('Are you sure?');
        if (decision) {
            this._bannerService.deleteBanner(id)
                .then((banner) => {
                    const oldBanner = this.banners.find((b) => b.id === banner.id);
                    const oldBannerIndex = this.banners.indexOf(oldBanner);
                    if (oldBannerIndex !== -1) {
                        this.banners.splice(oldBannerIndex, 1);
                    }
                })
                .catch((error) => console.log(error));
        }
    }

    public getCasinosWithoutBanner(): Casino[] {
        return this.casinos.filter((c) => !c.banner.image_link);
    }

    private checkUrl(url: string): boolean {
        return new RegExp(/^http(s)?:\/\/.+/).test(url);
    }
}
