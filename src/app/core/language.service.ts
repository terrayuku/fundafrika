import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  addLanguage(value) {
    return new Promise<any>((resolve, reject) => {
      this.db.database.ref("languages")
        .push({
          language: value.lang,
          country: value.country,
          countryCode: value.countryCode
        }).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
    });
  }

  getAllLanguages() {
    return new Promise<any>((resolve, reject) => {
      this.db.list("languages").snapshotChanges()
        .subscribe(languages => {
          resolve(languages);
        });
    });
  }
}

