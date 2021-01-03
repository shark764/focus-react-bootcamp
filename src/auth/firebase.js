import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBo38caymcW3sSZ5fXh6wcIJtr5Ubq9_Ns',
  authDomain: 'react-firebase-bootcamp-4d277.firebaseapp.com',
  projectId: 'react-firebase-bootcamp-4d277',
  storageBucket: 'react-firebase-bootcamp-4d277.appspot.com',
  messagingSenderId: '1089025490603',
  appId: '1:1089025490603:web:7bfa1ebabaae18cfdd81ee',
  measurementId: 'G-CV64YEW374',
};

const settings = {
  timestampsInSnapshots: true,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();

firebase.firestore().settings(settings);
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const signOut = () => {
  auth.signOut();
};

export const signInWithEmailAndPassword = async (email, password) => auth.signInWithEmailAndPassword(email, password);

export const createUserWithEmailAndPassword = async (email, password) => auth.createUserWithEmailAndPassword(email, password);

export const sendPasswordResetEmail = async (email) => auth.sendPasswordResetEmail(email);

// eslint-disable-next-line consistent-return
const getUserDocument = async (uid) => {
  if (!uid) {
    return null;
  }
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error('Error fetching user', error);
  }
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) {
    return;
  }
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData,
      });
    } catch (error) {
      console.error('Error creating user document', error);
    }
  }
  // eslint-disable-next-line consistent-return
  return getUserDocument(user.uid);
};

export const createPatient = (data) => firestore.collection('patients').add({
  created: firebase.firestore.FieldValue.serverTimestamp(),
  ...data,
});

export const getPatientsCollection = () => firestore.collection('patients');
export const getPatients = () => getPatientsCollection().get();

export const addStudyToPatient = (doc, study) => getPatientsCollection()
  .doc(doc)
  .update({
    studies: firebase.firestore.FieldValue.arrayUnion(study),
  });
export const removeStudyFromPatient = (doc, study) => getPatientsCollection()
  .doc(doc)
  .update({
    studies: firebase.firestore.FieldValue.arrayRemove(study),
  });
