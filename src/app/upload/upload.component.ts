import { Component, OnInit } from '@angular/core';
import { UploadService } from '../core/upload.service';
import { AuthService } from '../core/auth.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// import { registerElement } from "nativescript-angular/element-registry";
// // import { Video } from "nativescript-videoplayer";
// registerElement("exoplayer", () => require("nativescript-exoplayer").Video);    

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {

  uploadForm: FormGroup
  video: File
  loc: string
  constructor(
    private uploadService: UploadService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.loc = "gs://fundafrika-2e7be.appspot.com/videos/Computer Literacy/Vusi.mp4";
  }

  createForm() {
    this.uploadForm = this.formBuilder.group({
      subject: ['', Validators.required],
      video: ['', Validators.required]
    })
  }

  browse(event) {
    console.log(event.target, event.target.files)
    this.video = event.target.files[0];
  }

  uploadVideo(value) {
    this.uploadService.uploadVideo(value.subject, this.video)
      .then(task => {
        console.log("Task ", task);
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
