import Firebase from 'firebase';
let config = {
  apiKey: 'AIzaSyA-UdXktMZnVKYWeTRmv0IRQwaZ-J1whOQ',
  authDomain: 'rnfirebXXX-XXXX.firebaseapp.com',
  databaseURL: 'rnfirebXXX-XXXX.firebaseapp.com',
  projectId: 'rnfirebase-XXXX',
  storageBucket: 'rnfirebase-XXXX.appspot.com',
  messagingSenderId: 'XXXXXXX',
};
let app = Firebase.initializeApp(config);
export const db = app.database();
