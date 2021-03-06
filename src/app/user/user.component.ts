import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserModel } from '../core/user.model';
import { LanguageService } from '../core/language.service';

@Component({
  selector: 'user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.css']
})
export class UserComponent implements OnInit {

  user: UserModel = new UserModel();
  profileForm: FormGroup;
  uid: string;
  languages: Object[] = [];
  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'surname': [
      { type: 'required', message: 'Surname is required.' }
    ],
    'age': [
      { type: 'required', message: 'Age is required.' },
    ],
    'category': [
      { type: 'required', message: 'Category is required.' },
    ],
    'subject': [
      { type: 'required', message: 'Subjects is required.' },
    ],
    'province': [
      { type: 'required', message: 'Province is required.' },
    ],
    'grade': [
      { type: 'required', message: 'Grade is required.' },
    ]
  };

  constructor(
    private languageService: LanguageService,
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private router: Router
  ) {

  }

  ngOnInit(): void {

    // load user data
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      this.uid = this.authService.afAuth.auth.currentUser.uid;
      if (data) {
        this.user = data;
        this.createForm(this.user.name, this.user.surname, this.user.age, this.user.grade, this.user.province,
          this.user.category, this.user.subjects, this.user.language);
      }
    });

    // load languages
    this.languageService.getAllLanguages()
      .then(languages => {
        languages.forEach(l => {
          this.languages.push(l.payload.val());
        });
      }).catch(err => console.log("Lang Err", err));
  }

  createForm(name, surname, age, grade, province, category, subjects, language) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required],
      surname: [surname, Validators.required],
      age: [age, Validators.required],
      grade: [grade, Validators.required],
      province: [province, Validators.required],
      category: [category, Validators.required],
      subjects: [subjects, Validators.required],
      language: [language, Validators.required]
    });
  }

  save(value) {
    this.userService.updateCurrentUser(value)
      .then(res => {
        console.log(res);
      }, err => console.log(err))
  }

  logout() {
    this.authService.doLogout()
      .then((res) => {
        this.location.back();
      }, (error) => {
        console.log("Logout error", error);
      });
  }

  resetFields() {
    // this.avatarLink = "https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg";
    this.profileForm = this.fb.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      subjects: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      grade: new FormControl('', Validators.required),
      province: new FormControl('', Validators.required)
    });
  }

  onSubmit(value) {
    this.userService.createUser(value, this.uid)
      .then(res => {
        this.userService.getCurrentUser()
          .then((res) => {
            this.router.navigate(['/dashboard/', res.uid, value.category]);
          });
      }, err => {
        console.log(err);
      });
    this.resetFields();
  }
}
