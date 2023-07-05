import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OverviewUserPostComponent } from 'src/app/components/user/user-post/overview-user-post/overview-user-post.component';
import { OverviewUserQuestionComponent } from 'src/app/components/user/user-question/overview-user-question/overview-user-question.component';
import { UserQuestionComponent } from 'src/app/components/user/user-question/user-question/user-question.component';

const routes: Routes = [
  {
    path: '',
      component: OverviewUserPostComponent
  },
  {
    path: 'u-question/:id',
    component: UserQuestionComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class UserModule { }
