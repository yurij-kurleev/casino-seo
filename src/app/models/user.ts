import {IContacts} from './contacts';
import {IChannel} from './channel';

export interface IUser {
    idUser: string;
    login: string;
    nick: string;
    channel_id: string;
    image_link: string;
    registration_date: string;
    role: string;
    position: number;
    contacts: IContacts;
    channel?: IChannel;
    first_name?: string;
    last_name?: string;
}

export class User implements IUser {
    idUser: string;
    login: string;
    nick: string;
    channel_id: string;
    image_link: string;
    registration_date: string;
    role: string;
    position: number;
    contacts: IContacts;
    channel?: IChannel;
    first_name?: string;
    last_name?: string;


    constructor(login?: string, nick?: string, channel_id?: string, image_link?: string,
                registration_date?: string, contacts?: IContacts, channel?: IChannel,
                first_name?: string, last_name?: string, idUser?: string, role?: string,
                position?: number) {
        this.idUser = idUser || '';
        this.login = login || '';
        this.nick = nick || '';
        this.channel_id = channel_id || '';
        this.image_link = image_link || '';
        this.registration_date = registration_date || '';
        this.contacts = contacts || <IContacts>{};
        this.channel = channel || <IChannel>{};
        this.first_name = first_name || '';
        this.last_name = last_name || '';
        this.role = role || 'user';
        this.position = (position === undefined || position === null) ? 20 : position;
    }
}
