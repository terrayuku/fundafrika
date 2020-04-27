import { Component, OnInit } from '@angular/core';
import { UploadService } from '../core/upload.service';
import { AuthService } from '../core/auth.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TutorialService } from '../core/tutorial/tutorial.service';
import { SubjectService } from '../core/subject.service';
import { LanguageService } from '../core/language.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {

  uploadForm: FormGroup;
  video: File;
  loc: string;
  tutorials: Object[] = [];
  subjects: Object[] = [];
  languages: Object[] = [];
  validation_messages = {
    'title': [
      { type: 'required', message: 'Title is required.' }
    ],
    'description': [
      { type: 'required', message: 'Description is required.' }
    ]
  };
  constructor(
    private languageService: LanguageService,
    private tutorialService: TutorialService,
    private subjectService: SubjectService,
    private uploadService: UploadService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.createForm();
    // load tutorials
    this.tutorialService.getAllTutorial().then(tutorials => {
      tutorials.forEach(tutorial => {
        if(tutorial.payload.val().teacher === this.authService.currentUser().uid) {
          this.loc = tutorial.payload.val().tutorialUrl
          this.tutorials.push(tutorial.payload.val());
        }
      });
    });

    // load subjects
    this.subjectService.getAllSubjects()
      .then(subjects => {
        subjects.forEach(s => {
          this.subjects.push(s.payload.val());
        });
      })
      .catch(err => console.log('Lang Subj Err', err));

       // load languages
    this.languageService.getAllLanguages()
    .then(languages => {
      languages.forEach(l => {
          this.languages.push(l.payload.val());
      });
    }).catch(err => console.log('Lang Err', err));
  }

  createForm() {
    this.uploadForm = this.formBuilder.group({
      subject: ['', Validators.required],
      language: ['', Validators.required],
      video: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  browse(event) {
    this.video = event.target.files[0];
  }

  uploadVideo(value) {
    this.uploadService.uploadVideo({
      subject: value.subject,
      video: this.video,
      language: value.language,
      title: value.title,
      description: value.description})
      .then(task => {
      })
      .catch(err => {
        console.log(err);
      });
  }

}
