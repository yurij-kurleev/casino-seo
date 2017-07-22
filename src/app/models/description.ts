export interface IDescription {
    idDescription: string;
    type: string;
    text: string;
}

export class Description {
    idDescription: string;
    type: string;
    text: string;


    constructor(type?: string, text?: string, idDescription?: string) {
        this.idDescription = idDescription || '';
        this.type = type || '';
        this.text = text || '';
    }
}
