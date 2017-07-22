export interface IChannel {
    id: string;
    description: string;
    link: string;
    name: string;
    type: string;
}

export class Channel implements IChannel {
    id: string;
    description: string;
    link: string;
    name: string;
    type: string;


    constructor(description?: string, link?: string, name?: string, type?: string, id?: string) {
        this.id = id || '';
        this.description = description || '';
        this.link = link || '';
        this.name = name || '';
        this.type = type || '';
    }
}
