import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { UserModel } from '../core/user.model';
import { UserService } from '../core/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: UserModel = new UserModel();
  constructor(
    public authService: AuthService,
    public userService: UserService,
    private route: ActivatedRoute,
    private location : Location,
  ) { 
  }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
      }
    })
  }

  logout(){
    this.authService.doLogout()
    .then((res) => {
      this.location.back();
    }, (error) => {
      console.log("Logout error", error);
    });
  }

}
