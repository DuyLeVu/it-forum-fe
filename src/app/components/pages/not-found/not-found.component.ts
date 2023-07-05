import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear();
    // this.router.navigate(['']);
    $('#logout').modal('show')
    setTimeout(() => {
      $('#logout').modal('hide');
      // $("#showLogin").click()
      // window.location.reload();
      this.router.navigate(['']);
    }, 2000)
  }

}
