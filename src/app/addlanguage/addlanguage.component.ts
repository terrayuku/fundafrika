import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../core/language.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-addlanguage',
  templateUrl: './addlanguage.component.html',
  styleUrls: ['./addlanguage.component.css']
})
export class AddlanguageComponent implements OnInit {

  languageForm: FormGroup
  languages: Object[] = [];
  constructor(
    private languageService: LanguageService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private location: Location
  ) {
    this.createForm();
   }

  ngOnInit(): void {
    this.getAllLanguages();
  }

  createForm() {
    this.languageForm = this.formBuilder.group({
      lang: ['', Validators.required],
      country: ['', Validators.required],
      countryCode: ['', Validators.required]
    });
  }

  addLanguage(value) {
    console.log(value);
    this.languageService.addLanguage(value)
    .then(res => {
    }).catch(err => console.log("Lang Err", err));
  }

  getAllLanguages() {
    this.languageService.getAllLanguages()
      .then(languages => {
        languages.forEach(l => {
            this.languages.push(l.payload.val());
        })
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
