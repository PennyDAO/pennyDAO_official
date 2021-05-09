import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const app = firebase.initializeApp({
    apiKey: "AIzaSyAqSGFG99u16nrognDzTgiqAnC5XbkoCWE",
    authDomain: "pennydao-dapp-505ef.firebaseapp.com",
    projectId: "pennydao-dapp-505ef",
    storageBucket: "pennydao-dapp-505ef.appspot.com",
    messagingSenderId: "1090120733647",
    appId: "1:1090120733647:web:c7bac4545f6ec381b238ba"
});


export const auth = app.auth();
export default app;