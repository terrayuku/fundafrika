import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
// Listens for new users added to /users
exports.setUserRole = functions.database.ref('/users/{role}/{uid}')
    .onWrite((snapshot, context) => {
      // Grab the current value of what was written to the Realtime Database.
      return new Promise<any>((resolve, reject) => {
          if(context.auth !== undefined) {
              const uid = context.auth.uid;

            admin.auth().setCustomUserClaims(context.auth.uid, {
                role: context.params.uid
            }).then((res) => {
                console.log("Users role " + uid + " was updated ok");
                resolve(res);
            }).catch((err) => {
                console.error("Could not update user role " + uid, err);
                reject(err);
            });

          } else {
              return;
          }
          
    });
}); 

