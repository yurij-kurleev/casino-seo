export interface IBanner {
    id: string;
    casino_id: string;
    text: string;
    image_link: string;
}

export class Banner implements IBanner {
    id: string;
    casino_id: string;
    text: string;
    image_link: string;


    constructor(text?: string, image_link?: string, casino_id?: string, id?: string ) {
        this.id = id || '';
        this.casino_id = casino_id || '';
        this.text = text || '';
        this.image_link = image_link || '';
    }
}

