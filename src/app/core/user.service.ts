import { Injectable } from "@angular/core";
// import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {
  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth
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

  currentUser() {
    return firebase.auth().currentUser;
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
          resolve(res);
        }).catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }
}
