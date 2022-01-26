import 'firebase/firestore';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

//DESARROLLO/PRODUCCION
const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
};

/*const firebaseConfig = {
    apiKey: "AIzaSyBE7xFJEeuMPfLsej3T5B-DMoLAD_BVyS0",
    authDomain: "react-app-curso-71baa.firebaseapp.com",
    projectId: "react-app-curso-71baa",
    storageBucket: "react-app-curso-71baa.appspot.com",
    messagingSenderId: "137029993797",
    appId: "1:137029993797:web:fca4458012f5815f792a2c"
  };

//TESTING  
const firebaseConfigTesting = {
  apiKey: "AIzaSyB8unP98Nnlw3nYcMKPTvxeq2sWZHYLYas",
  authDomain: "react-app-testing-86b97.firebaseapp.com",
  projectId: "react-app-testing-86b97",
  storageBucket: "react-app-testing-86b97.appspot.com",
  messagingSenderId: "987104674892",
  appId: "1:987104674892:web:23b084237b57908a6360e9"
};*/



  // Initialize Firebase
  //const firebaseApp = initializeApp(firebaseConfig);
  const firebaseApp = initializeApp(firebaseConfig);
  /*if ( process.env.NODE_ENV === 'test' ) {
 
    const firebaseApp = initializeApp(firebaseConfigTesting);
 
  } else {
 
    const firebaseApp = initializeApp(firebaseConfig);
 
  }*/

const db = getFirestore();
 
const googleAuthProvider = new GoogleAuthProvider();
   
export{
    db,
    googleAuthProvider,
    firebaseApp     
}