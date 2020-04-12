import { Injectable } from "@angular/core";
// import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { SubscriptionModule } from './subscription/subscription.module';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {
  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private subscriptionModule: SubscriptionModule,
    private authService: AuthService
  ) {
  }


  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }

  updateCurrentUser(value) {
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name + " " + value.surname,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  createUser(value, id) {
    return new Promise<any>((resolve, reject) => {
      this.db.database.ref("users/" + value.category + '/' + id).
        set({
          name: value.name,
          surname: value.surname,
          age: parseInt(value.age),
          grade: parseInt(value.grade),
          category: value.category,
          province: value.province,
          subjects: value.subjects,
          language: value.language
          // avatar: avatar
        }).then(res => {
          this.updateCurrentUser(value);
          this.subscriptionModule.subscribeToASubject({
            role: value.category,
            subject: value.subjects[0]
          });
          resolve(res);
        }).catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }

  updateTutorial(downloadUrl, role, subject) {
    console.log("Upload Tutorial");
    return new Promise<any>((resolve, reject) => {
      this.db.database.ref("users/" + role + "/" + firebase.auth().currentUser.uid + "/subjects/" + subject + "/tutorials").push({
        tutorialUrl: downloadUrl
      }).then(res => {
        resolve(res);
      }).catch(err => reject(err));
    });
  }

  getUsersSubjects(currentUser, role) {
    return new Promise<any>((resolve, reject) => {
      this.db.list("users/" + role + "/" + currentUser.uid)
        .snapshotChanges()
        .subscribe(user => {
          user.forEach(u => {
            if (u.key === "subjects") {
              resolve(u.payload.val());
            }
          });
        });
    });
  }

  getUsersLanguge(currentUser, role) {
    return new Promise<any>((resolve, reject) => {
      this.db.list("users/" + role + "/" + currentUser.uid)
        .snapshotChanges()
        .subscribe(user => {
          user.forEach(u => {
            if (u.key === "language") {
              resolve(u.payload.val());
            }
          });
        });
    });
  }
}
