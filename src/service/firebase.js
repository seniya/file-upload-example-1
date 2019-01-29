import firebase from 'firebase';
import { fbConfig } from '../config';

firebase.initializeApp(fbConfig);
//const db = firebase.firestore();
export default firebase;