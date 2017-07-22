import {Component, OnInit} from '@angular/core';
import {Post} from '../models/post';
import {BlogService} from '../shared/blog.service';

declare var $: any;

@Component({
    selector: 'app-blog-admin',
    templateUrl: './blog-admin.component.html',
    styleUrls: [
        './blog-admin.component.css',
        '../global.styles.css'
    ]
})
export class BlogAdminComponent implements OnInit {
    public posts: Post[] = [];
    public newPost = new Post();
    public isChangingPost = false;
    public errorMsg: string;

    constructor(private _blogService: BlogService) {
    }

    ngOnInit() {
        this.getAllPosts();
    }

    public getAllPosts(): void {
        this._blogService.getAllPosts()
            .then((posts) => {
                this.posts = posts.sort(this.dateComparator);
                this.posts = this.posts.reverse();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    public isValidForm(): boolean {
        for (let i in this.newPost) {
            if (!this.newPost[i] && i !== 'id' && i !== 'image_link' && i !== 'date') {
                this.errorMsg = 'Empty ' + i;
                return false;
            }
        }
        const input = <HTMLInputElement>document.getElementById('file');
        if (!input.files[0]) {
            this.errorMsg = 'Add picture!';
            return false;
        }
        return true;
    }

    public addPost(): void {
        if (this.isValidForm()) {
            $('#login-modal').modal('hide');
            const input = <HTMLInputElement>document.getElementById('file');
            const file = input.files[0];
            this._blogService.addPost(this.newPost, file)
                .then((post) => {
                    this.posts[0] = post;
                })
                .catch((error) => console.log(error));
        } else {
            alert(this.errorMsg);
        }
    }

    public updatePost(): void {
        if (this.isValidForm()) {
            $('#login-modal').modal('hide');
            const input = <HTMLInputElement>document.getElementById('file');
            const file = input.files[0];
            this._blogService.updatePost(this.newPost, file, this.newPost.id)
                .then((post) => {
                    const oldPost = this.posts.find((p) => p.id === post.id);
                    const oldPostIndex = this.posts.indexOf(oldPost);
                    if (oldPostIndex !== -1) {
                        this.posts[oldPostIndex] = post;
                    }
                })
                .catch((error) => console.log(error));
        } else {
            alert(this.errorMsg);
        }
    }

    public deletePost(id: string): void {
        const decision = confirm('Are you sure?');
        if (decision) {
            this._blogService.deletePost(id)
                .then((post) => {
                    const oldPost = this.posts.find((p) => p.id === post.id);
                    const oldPostIndex = this.posts.indexOf(oldPost);
                    if (oldPostIndex !== -1) {
                        this.posts.splice(oldPostIndex, 1);
                    }
                })
                .catch((error) => console.log(error));
        }
    }

    public findPostToUpdate(post: Post): void {
        this.isChangingPost = true;
        this.newPost = this.posts.find((p) => p.id === post.id);
    }

    public clearForm(): void {
        this.isChangingPost = false;
        this.newPost = new Post();
    }

    private dateComparator (a, b) {
        return new Date(a).getTime() - new Date(b).getTime();
    }
}
