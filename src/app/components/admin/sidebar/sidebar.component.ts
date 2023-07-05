import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

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
