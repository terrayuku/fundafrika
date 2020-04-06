import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subject } from './subject.model';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable()
export class SubjectService {
  subject: Subject;
  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private userService: UserService
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

  getASubject(value, role) {
    return new Promise<any>((resolve, reject) => {
      this.db.list("subjects/" + value.subject).snapshotChanges()
        .subscribe(subject => {
          if (role === "moderators") {
            resolve(subject[0]);
          } else if (role === "students") {
            resolve(subject[1]);
          } else if(role === "teachers") {
            resolve(subject[2]);
          }
        });
    });
  }

  subscribeToASubject(value) {
    return new Promise<any>((resolve, reject) => {
      var currentUser = this.userService.currentUser();
      this.authService.getRole(currentUser)
        .then(role => {
          this.getASubject(value, role)
            .then(subject => {
              this.updateSubscription(value.subject, subject.key.toString(), subject.payload.val() + 1);
            });
        }).catch(err => {
          console.log(err);
        });
    })
  }

  updateSubscription(subject, fieldToUpdate, currentValue) {
    return new Promise<any>((resolve, reject) => {
      if(fieldToUpdate === "numberOfStudentsSubscribed") {
        this.db.database.ref("subjects/" + subject).update({
          numberOfStudentsSubscribed: currentValue 
        }).then(res => {
          console.log("Subscribed to " + subject + " now " + fieldToUpdate + " is " + currentValue);
        }).catch(err => {
          console.log("Could Not Subscribe", err);
        });
      } else if(fieldToUpdate === "numberOfModeratorsSubscribed") {
        this.db.database.ref("subjects/" + subject).update({
          numberOfModeratorsSubscribed: currentValue 
        }).then(res => {
          console.log("Subscribed to " + subject + " now " + fieldToUpdate + " is " + currentValue);
        }).catch(err => {
          console.log("Could Not Subscribe", err);
        });
      } else {
        this.db.database.ref("subjects/" + subject).update({
          numberOfTeachersSubscribed: currentValue 
        }).then(res => {
          console.log("Subscribed to " + subject + " now " + fieldToUpdate + " is " + currentValue);
        }).catch(err => {
          console.log("Could Not Subscribe", err);
        });
      }
    });
  }
}
