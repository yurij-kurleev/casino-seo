import {Banner} from './banner';
import {ICasinoTable} from './casinoTable';
export interface ICasino {
    id: string;
    logo_image: string;
    bonus_text: string;
    description: string;
    getBonus_link: string;
    casino_link: string;
    name: string;
    position: number;
    banner: Banner;
    casinoRows: Array<any>;
}

export class Casino implements ICasino {
    id: string;
    logo_image: string;
    bonus_text: string;
    description: string;
    getBonus_link: string;
    casino_link: string;
    name: string;
    position: number;
    banner: Banner;
    casinoRows: Array<any>;

    constructor(
        logoImage?: string,
        bonusText?: string,
        description?: string,
        getBonusLink?: string,
        casinoLink?: string,
        name?: string,
        position?: number,
        banner?: Banner,
        idCasino?: string,
        casinoRows?: Array<any>
    ) {
        this.logo_image = logoImage || '';
        this.bonus_text = bonusText || '';
        this.description = description || '';
        this.getBonus_link = getBonusLink || '';
        this.casino_link = casinoLink || '';
        this.name = name || '';
        this.position = position || 0;
        this.banner = banner || new Banner();
        this.id = idCasino || '';

        this.casinoRows = casinoRows || [];
    }
}

