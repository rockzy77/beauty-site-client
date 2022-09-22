import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

var firebase_app;

function initializeFirebase(){
    const firebaseConfig = {
        apiKey: "AIzaSyCOiB9QHYBn7FjE8UTPUMTkKZ8OTrAX8So",
        authDomain: "reap-22844.firebaseapp.com",
        projectId: "reap-22844",
        storageBucket: "reap-22844.appspot.com",
        messagingSenderId: "1031429295028",
        appId: "1:1031429295028:web:c616b8d001c75fead500e1",
        measurementId: "G-3SNPH5SRBD",
      };
      
    firebase_app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(firebase_app);
      
      
}


export {initializeFirebase, firebase_app};