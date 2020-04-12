import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subject } from './subject.model';
import { AuthService } from './auth.service';
import { SubscriptionModule } from './subscription/subscription.module';

@Injectable()
export class SubjectService {
  subject: Subject;
  constructor(
    private db: AngularFireDatabase
  ) { }

  addSubject(value) {
    return new Promise<any>((resolve, reject) => {
      this.db.database.ref("subjects/" + value.subject)
        .set({
          subject: value.subject,
          numberOfStudentsSubscribed: 0,
          numberOfTeachersSubscribed: 0,
          numberOfModeratorsSubscribed: 0
        }).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
    });
  }

  getAllSubjects() {
    return new Promise<any>((resolve, reject) => {
      this.db.list("subjects").snapshotChanges()
        .subscribe(subjects => {
          resolve(subjects);
        });
    });
  }

  updateTutorial(subject, downloadURL) {
    console.log("Upload Subject");
    return new Promise<any>((resolve, reject) => {
      this.db.database.ref("subjects/" + subject + "/tutorials").push({
        downloadURL: downloadURL
      })
    });
  }
}
