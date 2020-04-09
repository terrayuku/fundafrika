import { Component, OnInit } from '@angular/core';
import { UploadService } from '../core/upload.service';
import { AuthService } from '../core/auth.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TutorialService } from '../core/tutorial/tutorial.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {

  uploadForm: FormGroup
  video: File
  loc: string
  tutorialsList: Object[] = []
  constructor(
    private tutorialService: TutorialService,
    private uploadService: UploadService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.tutorialService.getAllTutorial().then(tutorials => {
      tutorials.forEach(tutorial => {
        if(tutorial.payload.val().teacher === this.authService.currentUser().uid) {
          this.loc = tutorial.payload.val().tutorialUrl
          this.tutorialsList.push(tutorial.payload.val());
        }
      });
    });
  }

  createForm() {
    this.uploadForm = this.formBuilder.group({
      subject: ['', Validators.required],
      video: ['', Validators.required]
    })
  }

  browse(event) {
    this.video = event.target.files[0];
  }

  uploadVideo(value) {
    this.uploadService.uploadVideo(value.subject, this.video)
      .then(task => {
      })
      .catch(err => {
        console.log(err);
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
