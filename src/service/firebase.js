import firebase from 'firebase';
import { fbConfig } from '../config';

firebase.initializeApp(fbConfig);

export default firebase;