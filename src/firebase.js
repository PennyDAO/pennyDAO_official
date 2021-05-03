import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const app = firebase.initializeApp({
    apiKey: "AIzaSyCuwxHe8GV2t81ce_Ew16IjxYZnLbkDqrw",
    authDomain: "pennydao-74ee3.firebaseapp.com",
    databaseURL: "https://pennydao-74ee3-default-rtdb.firebaseio.com",
    projectId: "pennydao-74ee3",
    storageBucket: "pennydao-74ee3.appspot.com",
    messagingSenderId: "620156403931",
    appId: "1:620156403931:web:67aff5ba076539fc9b8cfe",
    measurementId: "G-VFC0WW8FVF"
});

export const auth = app.auth();
export default app;