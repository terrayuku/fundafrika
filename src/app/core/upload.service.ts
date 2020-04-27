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

  uploadVideo(value) {
    return new Promise<any>((resolve, reject) => {
      const task = this.storage.ref('videos/' + value.subject + '/' + value.video.name).put(value.video);
      task.then(t => {
        if (t.task.snapshot.state === 'success') {
          t.task.snapshot.ref.getDownloadURL().then(downloadURL => {
            // add tutorial
            this.tutorialService.addTutorial({
              teacher: this.authService.currentUser().uid,
              subject: value.subject,
              tutorialUrl: downloadURL,
              language: value.language,
              title: value.title,
              description: value.description
            });
            // add tutorial to subject
            this.subjectService.updateTutorial(value.subject, downloadURL);
          }).catch(err => reject(err));
        }
        resolve(t);
      }).catch(err => reject(err));
    });
  }
}
