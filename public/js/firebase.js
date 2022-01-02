
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAkfcVtNcyDlW0yiTH2i5rYdmBJ_z1O57M",
    authDomain: "firescout3824.firebaseapp.com",
    databaseURL: "https://firescout3824-default-rtdb.firebaseio.com",
    projectId: "firescout3824",
    storageBucket: "firescout3824.appspot.com",
    messagingSenderId: "246498824596",
    appId: "1:246498824596:web:efc2c0cbc94999559d3f81",
    measurementId: "G-7SBQ64VMNP"
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, getRedirectResult, createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword, browserSessionPersistence, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
const app = initializeApp(firebaseConfig);


    // Set the configuration for your app
    // TODO: Replace with your project's config object
    var config = {
        apiKey: "AIzaSyAkfcVtNcyDlW0yiTH2i5rYdmBJ_z1O57M",
        authDomain: "firescout3824.firebaseapp.com",
        databaseURL: "https://firescout3824-default-rtdb.firebaseio.com",
        projectId: "firescout3824",
        storageBucket: "firescout3824.appspot.com",
        messagingSenderId: "246498824596",
        appId: "1:246498824596:web:efc2c0cbc94999559d3f81",
        measurementId: "G-7SBQ64VMNP"
    };
    firebase.initializeApp(config);
    // Get a reference to the database service
    var database = firebase.database();
    var auth = firebase.auth();

    try {
        let app = firebase.app();
        let features = ['auth', 'database'].filter(feature => typeof app[feature] === 'function');
        if (document.URL.includes("index.html")) {
            document.getElementById('load').innerHTML = `Created by Evan Boswell, Nick Broyles, Max Howell, Grant Johnson, Weston Agreda, Graham Boswell. Firebase SDK loaded with ${features.join(', ')}`;
        }

    } catch (e) {
        console.error(e);
        if (document.URL.includes("index.html")) {
            document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
        }
    }
//================ Auth =============
var ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start('#firebaseui-auth-container', {
  signInOptions: {
    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
    requireDisplayName: true
  },
  // Other config options...
});

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: 'https://firescout3824.web.app/index.html',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    //firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: 'https://firescout3824.web.app/analytics.html',
  // Privacy policy url.
  privacyPolicyUrl: 'https://firescout3824.web.app/analytics.html'
};

ui.start('#firebaseui-auth-container', uiConfig);


setPersistence(auth, browserSessionPersistence).then(() => {
  // Existing and future Auth states are now persisted in the current
  // session only. Closing the window would clear any existing state even
  // if a user forgets to sign out.
  // ...
  // New sign-in will be persisted with session persistence.
  return signInWithEmailAndPassword(auth, email, password);
}).catch((error) => {
  // Handle Errors here.
  const errorCode = error.code;
  const errorMessage = error.message;
});

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

setTimeout(function(){
  try{
    console.log(firebase.auth().currentUser.displayName);
    document.getElementById("loginButton").innerHTML = "Welcome Back: " + firebase.auth().currentUser.displayName;
  }catch(e){
    console.log(e);
  }
}, 2300)



// ===========Initialize Firebase
import { getDatabase, ref, set, child, update, remove, onValue} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

const db = getDatabase();

function firebaseConnected(){
    if (app != null){
        try {
            document.getElementById("load").innerHTML = "Firebase SDK loaded";
        }catch (error){
            console.log(error);
        }
    }
}
firebaseConnected();

export function writeData(name, score) {
    set(ref(db, 'test/' + name), {
        score: score
    });
    username = document.getElementById("name").value;
}
let username = "name";
const scoreCount = ref(db, 'test/', username, 'score');
onValue(scoreCount, (snapshot) => {
  const data = snapshot.val();
  document.getElementById("test").innerHTML = data[username]["score"];
});


