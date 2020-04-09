import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { UserModel } from '../core/user.model';
import { UserService } from '../core/user.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: UserModel = new UserModel();
  role: String[];
  teacherDashboard: boolean = false;
  studentDashboard: boolean = false;
  moderatorDashboard: boolean = false;
  constructor(
    public authService: AuthService,
    public userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
    // get data
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
      }
    });

    // get role
      this.route.params.forEach(p => {
        console.log(p.role);
        if(p.role === "teachers") this.teacherDashboard = true;
        else if(p.role === "students") this.studentDashboard = true;
        else this.moderatorDashboard = true;
      });
  }

  logout() {
    this.authService.doLogout()
      .then((res) => {
        this.location.back();
      }, (error) => {
        console.log("Logout error", error);
      });
  }

}
