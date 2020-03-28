// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const firebaseConfig = {
  apiKey: "AIzaSyALo1kyA6_aVIOPXlRkX2mzzDH4fy2NQzw",
  authDomain: "fundafrika-2e7be.firebaseapp.com",
  databaseURL: "https://fundafrika-2e7be.firebaseio.com",
  projectId: "fundafrika-2e7be",
  storageBucket: "fundafrika-2e7be.appspot.com",
  messagingSenderId: "381988127689",
  appId: "1:381988127689:web:9a79892baca7c4084a9e18"
};
export const environment = {
  production: false,
  firebaseConfig: firebaseConfig
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
