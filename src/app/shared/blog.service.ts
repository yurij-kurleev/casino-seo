import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import {Post} from '../models/post';

@Injectable()
export class BlogService {
    private baseUrl = 'http://77.220.213.35:8080/v1/post/';

    constructor(private _http: Http) {
    }

    public getAllPosts(): Promise<Post[]> {
        return this._http.get(this.baseUrl + 'getAll')
            .toPromise()
            .then((response) => {
                const body = response.json().data;
                console.log(body);
                const posts: Post[] = [];
                for (const post of body) {
                    posts.push(new Post(post.title, post.description, post.image_link, post.date,
                        post._id));
                }
                return Promise.resolve(posts);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }

    public getOnePost(id: string): Promise<Post> {
        return this._http.get(this.baseUrl + 'get/' + id)
            .toPromise()
            .then((response) => {
                const body = response.json().data;
                return Promise.resolve(new Post(body.title, body.description, body.image_link,
                    body.date, body._id));
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }

    public addPost(data: Post, file: File): Promise<Post> {
        const headers = new Headers();
        headers.append('enctype', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        const options = new RequestOptions({headers: headers});
        const payload = new FormData();
        payload.append('file', file, file.name);
        const sendData = {
            title: data.title,
            description: data.description
        };
        payload.append('data', JSON.stringify(sendData));
        return this._http.post(this.baseUrl + 'create', payload, options)
            .toPromise()
            .then((response) => {
                const body = response.json().data;
                const post = new Post(body.title, body.description, body.image_link,
                    body.date, body._id);
                return Promise.resolve(post);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }

    public updatePost(data: Post, file: File, id: string): Promise<Post> {
        const headers = new Headers();
        headers.append('enctype', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        const options = new RequestOptions({headers: headers});
        const payload = new FormData();
        if (file) {
            payload.append('file', file, file.name);
        }
        const sendData = {
            title: data.title,
            description: data.description
        };
        payload.append('data', JSON.stringify(sendData));
        return this._http.put(this.baseUrl + 'update/' + id, payload, options)
            .toPromise()
            .then((response) => {
                const body = response.json().data;
                const post = new Post(body.title, body.description, body.image_link,
                    body.date, body._id);
                return Promise.resolve(post);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }

    public deletePost(id: string) {
        return this._http.delete(this.baseUrl + 'delete/' + id)
            .toPromise()
            .then((response) => {
                const body = response.json().data;
                const post = new Post(body.title, body.description, body.image_link,
                    body.date, body._id);
                return Promise.resolve(post);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            })
    }
}
