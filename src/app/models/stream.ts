export interface IStream {
    idStream: string;
    name: string;
    text: string;
    logoImage: string;
    casinoLink: string;
    streamLink: string;
}

export class Stream implements IStream {
    idStream: string;
    name: string;
    text: string;
    logoImage: string;
    casinoLink: string;
    streamLink: string;


    constructor(name?: string, text?: string, logoImage?: string, casinoLink?: string, streamLink?: string, idStream?: string) {
        this.name = name || '';
        this.text = text || '';
        this.logoImage = logoImage || '';
        this.casinoLink = casinoLink || '';
        this.streamLink = streamLink || '';
        this.idStream = idStream || '';
    }
}
