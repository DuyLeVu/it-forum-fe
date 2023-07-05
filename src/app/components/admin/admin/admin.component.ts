import { Role } from './../../../models/role';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { log } from 'console';
import { User } from 'src/app/models/user';
import { UserToken } from 'src/app/models/user-token';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  currentUser!: any;
  currentUserLogon!: any;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.getCurentUserFromLocalStorage();
    if (this.currentUser == null || this.currentUser.roles[0].name == 'ROLE_USER') {
      this.router.navigate(['error404']);
    }
  }

  getCurentUserFromLocalStorage() {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      this.userService.getUserProfile(x.id + "").subscribe(value => {
        this.currentUserLogon = value;
        })
      }, error => {
        console.log(error);
      });
    };
  }
