import { CommentFlatNode } from './../../../../models/comment-flat-node';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, UrlSerializer } from '@angular/router';
import { Post } from 'src/app/models/post';
import { UserToken } from 'src/app/models/user-token';
import { PostService } from 'src/app/services/post.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { CommentForm } from 'src/app/models/comment';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { ExampleFlatNode } from 'src/app/models/example-flat-node';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { nodes } from 'ngx-editor';
import { BehaviorSubject } from 'rxjs';
import { log } from 'console';

declare var $: any;
@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css']
})
export class DetailPostComponent implements OnInit {
  user!: User;
  post!: Post;
  id!: string;
  detail: string | undefined;
  currentUser?: UserToken;
  error!: any;
  top5PostByUser!: Post[];
  commentForm: FormGroup = new FormGroup({
    content: new FormControl('', [Validators.required]),
  });
  comment!: CommentForm;
  loadingReplyForm = false;
  commentReplyForm: FormGroup = new FormGroup({
    content: new FormControl('', [Validators.required]),
  });
  url: any;

  constructor(private router: Router,
    private postService: PostService,
    private activateRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit(): void {
    // console.log(this.post?.listComment?.length);
    this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      // @ts-ignore
      this.id = id;
    }, error => {
      console.log(error);
    });

    this.postService.findById(this.id).subscribe(result => {
      this.post = result;
      this.detail = this.post.detail;
      // console.log(this.post.listComment);
      this.getTop5PostByUser(result.id, result.user?.id);
      console.log(this.post);
    }, error => {
      console.log(error);
    });

    this.getCurentUserFromLocalStorage();

    // this.nestedDataSource.data = this.TREE_DATA;
    // console.log(this.TREE_DATA);
  }

  // hasNestedChild(index: number, node: CommentForm){
  //   return node.children!.length > 0;

  // }

  getCurentUserFromLocalStorage() {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
    }, error => {
      console.log(error);
    });
  }

  showDropdown() {
    $('#dropdown-content').display('block');
  }

  showModalDeletePost() {
    $('#deletePost').modal('show');
  }

  deletePost() {
    $('#deletePost').modal('hide');
    this.postService.deletePost(this.post?.id).subscribe(result => {
      $('#deletePostSuccess').modal('show');
      setTimeout(() => {
        $('#deletePostSuccess').modal('hide');
        // this.router.navigated = false;
        this.router.navigate(['users/user', this.post?.user?.id]);
      }, 2000)
    }, error1 => {
      if (error1 instanceof HttpErrorResponse) {
        if (error1.status == 400) {
          this.error = error1.error;
          $('#deletePostError').modal('show')
          setTimeout(() => {
            // this.createPostForm.reset();
            $('#deletePostError').modal('hide');
            this.router.navigated = false;
            this.router.navigate(['users/post', this.post?.id]);
          }, 2000)
        }
        else {
          this.error = "Lỗi hệ thống, Vui lòng thử lại!";
          $('#deletePostError').modal('show')
          setTimeout(() => {
            // this.createPostForm.reset();
            $('#deletePostError').modal('hide');
            this.router.navigated = false;
            this.router.navigate(['users/post', this.post?.id]);
          }, 2000);
        }
      }
    });
  };

  addComment(idPost: any, idParent: any) {
    this.userService.getUserProfile(this.currentUser?.id).subscribe(value => {
      this.user = value;
      this.comment = {
        content: this.commentForm.value.content,
        user: value,
      };
      this.postService.addComment(idPost, idParent, this.comment).subscribe(
        value => {
          // $('#cmtPostSuccess').modal('show');
          // setTimeout(() => {
            // $('#cmtPostSuccess').modal('hide');
            // // this.router.navigated = false;
            this.router.navigated = false;
            this.router.navigate(['users/post', this.post?.id]);
          // }, 2000)
          // this.getAllComment();
          // this.prepareFormComment();
          // console.log(value);
        }
      )
    });
    // this.commentForm.reset();
  };

  // showLoadingReplyForm(id: any) {
  //   let temp: any;
  //   temp = this.loadingReplyForm;
  //   this.loadingReplyForm = !temp;
  //   this.tempe = id;
  //   // item = !item;
  // }

  shareSocial(data: Post, key: string) {
    let postUrl = (document.location.href);
    let uri = encodeURI("https://it-naem-forum.web.app");
    // console.log(postUrl);
    // console.log(UrlSerializer);
    let postTitle = encodeURI(data.title!);
    switch (key) {
      case "fb-btn": {
        this.url = `https://www.facebook.com/sharer.php?u=${uri}`
        break;
      }
      case "tw-btn": {
        this.url = `https://twitter.com/share?url=${uri}&text=${postTitle}`;
        break;
      }
      case "lkI-btn": {
        this.url = `https://www.linkedin.com/shareArticle?url=${uri}&title=${postTitle}`;
        break;
      }

    }
  }

  getTop5PostByUser(postId: any, id: any) {
    console.log(postId);
    console.log(id);
    this.postService.getTop5ByUserId(postId, id).subscribe(result => {
      this.top5PostByUser = result;
      console.log(result);
    }, error => {
      console.log(error);
    });
  }
}
