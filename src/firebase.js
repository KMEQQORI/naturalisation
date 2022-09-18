import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDIxnA7FaOJHmuesa4wRvTtRTiEWGP0dL0",
    authDomain: "naturalisation-28430.firebaseapp.com",
    databaseURL: "https://naturalisation-28430-default-rtdb.firebaseio.com",
    projectId: "naturalisation-28430",
    storageBucket: "naturalisation-28430.appspot.com",
    messagingSenderId: "969533772621",
    appId: "1:969533772621:web:59e35fd45047722a7c5d04",
    measurementId: "G-1KTYXD273E"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db ;
