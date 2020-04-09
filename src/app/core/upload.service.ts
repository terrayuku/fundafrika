import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { SubjectService } from './subject.service';
import { map } from 'rxjs/operators';
import { TutorialService } from './tutorial/tutorial.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private tutorialService: TutorialService,
    private subjectService: SubjectService,
    private storage: AngularFireStorage,
    private authService: AuthService
  ) { }

  uploadVideo(subject, video) {
    console.log("Upload Video");
    return new Promise<any>((resolve, reject) => {
      let task = this.storage.ref("videos/" + subject + "/" + video.name).put(video);
      task.then(t => {
        if (t.task.snapshot.state === "success") {
          t.task.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.authService.getRole(this.authService.currentUser()).then(role => {
              // add tutorial
              this.tutorialService.addTutorial({
                teacher: this.authService.currentUser().uid,
                subject: subject,
                tutorialUrl: downloadURL
              });
              // add tutorial to subject
              this.subjectService.updateTutorial(subject, downloadURL);
            }).catch(err => reject(err));
          });
        }
        resolve(t);
      }).catch(err => reject(err));
    });
  }
}
