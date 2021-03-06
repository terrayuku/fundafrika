import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  addTutorial(tutorial) {
    return new Promise<any>((resolve, reject) => {
      this.db.database.ref("tutorials").push({
        teacher: tutorial.teacher,
        subject: tutorial.subject,
        tutorialUrl: tutorial.tutorialUrl,
        language: tutorial.language,
        title: tutorial.title,
        description: tutorial.description
      }).then(tut => {
        console.log("Added Tutorial");
        resolve(tut);
      }).catch(err => reject(err));
    });
  }

  getAllTutorial() {
    return new Promise<any>((resolve, reject) => {
      this.db.list("tutorials").snapshotChanges()
        .subscribe(tutorials => {
          resolve(tutorials);         
        });
    });
  }

  getTutorialsBySubject(subject) {
    return new Promise<any>((resolve, reject) => {
      this.getAllTutorial().then(tutorials => {
        let tutorialsBySubject = [];
        tutorials.forEach(tutorial => {
          if(tutorial.payload.val().subject === subject) {
            tutorialsBySubject.push(tutorial);
          }
        });
        resolve(tutorialsBySubject);
      });
    });
  }
}
