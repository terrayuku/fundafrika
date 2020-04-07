import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectService } from '../subject.service';
import { UserService } from '../user.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../auth.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SubscriptionModule { 
  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  updateSubjectSubscription(value, role, uid) {
    return new Promise<any>((resolve, reject) => {
      this.db.database.ref("users/" + role + "/" + uid).update({
        subscriptions: {
          subject: value.subject
        } 
      }).then(res => {
        console.log("Subscribed to " + value.subject);
      }).catch(err => {
        console.log("Could Not Subscribe to subject", err);
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
      var currentUser = this.authService.currentUser();
      this.authService.getRole(currentUser)
        .then(role => {
          this.getASubject(value, role === "UPDATE_PROFILE" ? value.role : role)
            .then(subject => {
              this.updateSubscription(value.subject, subject.key.toString(), subject.payload.val() + 1);
              this.updateSubjectSubscription(value, role, currentUser.uid);
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
