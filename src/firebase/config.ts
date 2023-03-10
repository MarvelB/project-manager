import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCHQMgSKBWhAAJAQwiMfFT07sHZaxvPU18",
    authDomain: "bmaravilladev-projectmanager.firebaseapp.com",
    projectId: "bmaravilladev-projectmanager",
    storageBucket: "bmaravilladev-projectmanager.appspot.com",
    messagingSenderId: "311329548477",
    appId: "1:311329548477:web:443b00167b804fc6702fd4"
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();

const projectAuth = firebase.auth();

const projectStorage = firebase.storage();

const timeStamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timeStamp, projectStorage }