import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { UserModel } from '../core/user.model';
import { UserService } from '../core/user.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { TutorialService } from '../core/tutorial/tutorial.service';
import { LanguageService } from '../core/language.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: UserModel = new UserModel();
  role: string;
  subject: string;
  tutorials: Object[] = [];
  tutorialsTemp: Object = [];
  teacherDashboard: boolean = false;
  studentDashboard: boolean = false;
  moderatorDashboard: boolean = false;
  languages: Object[] = [];
  languageForm: FormGroup;
  userLanguage: String = "";
  constructor(
    private languageService: LanguageService,
    private tutorialService: TutorialService,
    public authService: AuthService,
    public userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {

    this.createForm();
    // get data
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
      }
    });

    // get role
    this.route.params.forEach(p => {
      this.role = p.role;
      if (p.role === "teachers") this.teacherDashboard = true;
      else if (p.role === "students") this.studentDashboard = true;
      else this.moderatorDashboard = true;
    });
    // filter tutorials by users subject
    this.userService.getUsersSubjects(this.authService.currentUser(), this.role)
      .then(subjects => {
        subjects.forEach(subject => {
          this.tutorialService.getTutorialsBySubject(subject)
            .then(tutorials => {
              tutorials.forEach(t => {
                this.tutorials.push(t.payload.val());
              });
            });
        });
        // store original temp
        this.tutorialsTemp = this.tutorials;
      });

    // get users preferred language
    this.userService.getUsersLanguge(this.authService.currentUser(), this.role)
      .then(language => {
        this.userLanguage = language;
      });

    // load languages
    this.languageService.getAllLanguages()
      .then(languages => {
        languages.forEach(l => {
          // add all non preferred languages
          if (this.userLanguage.toLocaleLowerCase() !== l.payload.val().language.toLocaleLowerCase()) {
            this.languages.push(l.payload.val());
          }
        });
      }).catch(err => console.log("Lang Err", err));
  }

  createForm() {
    this.languageForm = this.fb.group({
      language: ['']
    })
  }

  logout() {
    this.authService.doLogout()
      .then((res) => {
        this.location.back();
      }, (error) => {
        console.log("Logout error", error);
      });
  }

  onSelectLanguage(event) {
    // filter tutorials based on language selected
    console.log(event.target.value);
    this.tutorials.forEach(tutorial => {
      console.log(tutorial['language'].toLocaleLowerCase() === event.target.value.toLocaleLowerCase());
      this.tutorials.filter(t => {
        if (t['language'].toLocaleLowerCase() === event.target.value.toLocaleLowerCase()) {
          this.tutorials = [];
          this.tutorials.push(t);
        } else {
          this.tutorials.push(this.tutorialsTemp);
        }
      });
    });
    console.log(this.tutorials);
  }

}
