import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PaginationService } from 'src/app/services/pagination.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {
  listPost!: Post[];
  listPostByAdmin: any = [];
  listPostByUser: any = [];
  // Paging
  dataSource!: Post[];
  // new MatTableDataSource<Customer>();
  displayedColumns = ['id', 'name', 'created', 'actions'];

  @Input('dataSource')
  set dataSourceForTable(value: Post[]) {
    this.dataSource = value;
  }
  // set dataSourceForTable(value: Post[]) {
  //     this.dataSource = new MatTableDataSource<Customer>(value);

  @Input() totalCount!: number;
  @Output() onDeleteCustomer = new EventEmitter();
  @Output() onPageSwitch = new EventEmitter();

  p: number = 1;
  total: number = 0;
  size: number = 10
  idNoti: number | undefined;

  constructor(private router: Router,
    private postService: PostService,
    public paginationService: PaginationService) { }

  ngOnInit(): void {
    this.postService.getTop4PostByAdmin().subscribe(result => {
      this.listPostByAdmin = result;
      this.idNoti = result[0].category?.id;
    }, error => {
      console.log(error);
    })

    this.getAllPosts();
  }

  getAllPosts() {
    this.postService.getAllV2(this.p, this.size).subscribe((result: any) => {
      this.listPost = result.content;
      this.total = result.totalElements;
      // console.log(result.content);
      // console.log(result.totalElements);
    })
  }

  pageChangeEvent(event: number) {
    this.p = event;
    this.getAllPosts();
  }

  goToAdminNoti() {
    this.router.navigate(['users/category', this.idNoti,'posts']);
    }
    
}
