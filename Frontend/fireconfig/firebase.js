import { initializeApp, getApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage} from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyBaRIfKMPVHTtyUH_3wrl2niPL_hEUKN-8",
    authDomain: "takeatrip-3e82d.firebaseapp.com",
    projectId: "takeatrip-3e82d",
    storageBucket: "takeatrip-3e82d.appspot.com",
    messagingSenderId: "541396544178",
    appId: "1:541396544178:web:d73cf0c665e34c85ac77ab"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, {experimentalForceLongPolling: true});
const storage=getStorage(app);
export { app,db, auth,storage };