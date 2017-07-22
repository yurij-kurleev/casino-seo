export interface IPost {
    id: string;
    title: string;
    description: string;
    image_link: string;
    date?: string;
}

export class Post implements IPost {
    id: string;
    title: string;
    description: string;
    image_link: string;
    date?: string;


    constructor(title?: string, description?: string, imageLink?: string, date?: string,
                id?: string) {
        this.title = title || '';
        this.description = description || '';
        this.image_link = imageLink || '';
        this.id = id || '';
        this.date = date || '';
    }
}

