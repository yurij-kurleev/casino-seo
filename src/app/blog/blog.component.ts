import {Component, OnInit} from '@angular/core';
import {Post} from '../models/post';
import {BlogService} from '../shared/blog.service';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: [
        './blog.component.css',
        '../global.styles.css'
    ]
})
export class BlogComponent implements OnInit {
    public posts: Post[] = [];

    constructor(private _blogService: BlogService) {
    }

    ngOnInit() {
        this.getAllPosts();
    }

    getAllPosts() {
        this._blogService.getAllPosts()
            .then((posts) => {
                this.posts = posts.sort(this.dateComparator);
                this.posts = this.posts.reverse();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    private dateComparator (a, b) {
        return new Date(a).getTime() - new Date(b).getTime();
    }
}
