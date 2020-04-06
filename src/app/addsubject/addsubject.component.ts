import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubjectService } from '../core/subject.service';
import { AuthService } from '../core/auth.service';
import { Location } from '@angular/common';
import { Subject } from '../core/subject.model';

@Component({
  selector: 'app-addsubject',
  templateUrl: './addsubject.component.html',
  styleUrls: ['./addsubject.component.css']
})
export class AddsubjectComponent implements OnInit {
  subjects = [];
  addSubjectForm: FormGroup
  constructor(
    private subjectService: SubjectService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private location: Location,
    private router: Router
  ) { 
    this.createForm();
  }

  createForm() {
    this.addSubjectForm = this.formBuilder.group({
      subject: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  addSubject(value) {
    console.log(value);
    this.subjectService.addSubject(value).
    then(res => {
      console.log(res);
    }).
    catch(err => {
      console.log(err);
    })
  }

  getAllSubjects() {
    this.subjectService.getAllSubjects()
      .then(subjects => {
        console.log(subjects);
        subjects.forEach(s => {
            console.log(s.payload.val(), s.payload.key);
            this.subjects.push(s.payload.val());
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  // getASubject(value) {
  //   this.subjectService.getASubject(value)
  //     .then(subject => {
  //       console.log(subject);
  //     }).catch(err => {
  //       console.log(err);
  //     });
  // }

  subscribe(value) {
    console.log(value);
    this.subjectService.subscribeToASubject(value)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
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
