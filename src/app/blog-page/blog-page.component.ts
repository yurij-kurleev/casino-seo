import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {BlogService} from '../shared/blog.service';
import {Post} from '../models/post';

@Component({
    selector: 'app-blog-page',
    templateUrl: './blog-page.component.html',
    styleUrls: [
        './blog-page.component.css',
        '../global.styles.css'
    ]
})
export class BlogPageComponent implements OnInit {
    public post: Post;

    constructor(private activatedRoute: ActivatedRoute,
                private _blogService: BlogService) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            const postId = params['id'];
            this.getPostById(postId);
        });
    }

    public getPostById(postId: string) {
        this._blogService.getOnePost(postId)
            .then((post) => {
                this.post = post;
            })
            .catch((error) => {
                console.log(error);
            })
    }
}
