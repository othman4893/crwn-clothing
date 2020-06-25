import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBau1uof1RjOe0ZSokFAGnuYPPSGYUQ1zw',
  authDomain: 'crwn-db-2a77e.firebaseapp.com',
  databaseURL: 'https://crwn-db-2a77e.firebaseio.com',
  projectId: 'crwn-db-2a77e',
  storageBucket: 'crwn-db-2a77e.appspot.com',
  messagingSenderId: '251394974820',
  appId: '1:251394974820:web:bf81b24ca24295fee2ab71',
  measurementId: 'G-6ZMF034K35',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export default firebase;
