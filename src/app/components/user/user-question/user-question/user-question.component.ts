import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-question',
  templateUrl: './user-question.component.html',
  styleUrls: ['./user-question.component.css']
})
export class UserQuestionComponent implements OnInit {
  listQuestion: any;
  p: number = 1;
  total: number = 0;
  size: number = 10;
  userId: any;
  constructor(private activatedRoute: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.userId = id;
      console.log(id);
      
    });
    this.getAllQuestions();
  }

  getAllQuestions() {
    console.log(this.userId);
    this.userService.getUserQuestions(this.p, this.size, this.userId).subscribe((result: any) => {
      this.listQuestion = result.content;
      this.total = result.totalElements;
    })
  }

  pageChangeEvent(event: number) {
    this.p = event;
    this.getAllQuestions();
  }
}
