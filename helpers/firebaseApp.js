import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCpeJy5LrePztFONmb4Yqt6lrJ7QWYfc98",
    authDomain: "esp8266-a2d9a.firebaseapp.com",
    databaseURL: "https://esp8266-a2d9a-default-rtdb.firebaseio.com",
    projectId: "esp8266-a2d9a",
    storageBucket: "esp8266-a2d9a.appspot.com",
    messagingSenderId: "143649723819",
    appId: "1:143649723819:web:d056d7f27f3e480ba06eee",
    measurementId: "G-FR6BBYSDX8"
};

const firebaseApp = initializeApp(firebaseConfig)

export default firebaseApp;