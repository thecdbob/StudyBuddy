

      //tomorrow fix the button to work in the module so you can use it

    //this is all firebase config stuff, it's loaded in a containerized module that's fairly
    //new to javascript, if you're looking at tutorial videos, the older v8 containers used
    //a different api than this that referred to a global firebase object, the reasons to go to this
    //is the behaviour of things like delaying loading of objects is done by default amoung other reasons
    
    //in addition, we are using a different approach, the default approach as the time of making this app
    //is to use npm to run javascript, however we can use a CDN (content delivery network) to get these modules
    //so if you're looking at a tutorial and you see them import objects from say 'firebase/auth', 
    //we are using webbased versions of those libraries
    


    //Firebase Libraries, we load all the things we need from firebase's CDN here

    //loads firebase
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
      
    //probably not needed but kept for now
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js";
      
    //import authentication from more libraries in firebase's website
    import { 
      getAuth, 
      onAuthStateChanged, 
      GithubAuthProvider, 
      signInWithPopup, 
      signOut } 
    from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js"
    //Firebase SDKs


    //this particular server info is for the CSCI265Project
    //if you want to use your own, change these values
    const firebaseConfig = {
  
      apiKey: "AIzaSyBmD0bxA7V8prQmeOP8Wc1nBVRRks7v-AI",
      authDomain: "studybuddy-3fc87.firebaseapp.com",
      projectId: "studybuddy-3fc87",
      storageBucket: "studybuddy-3fc87.appspot.com",
      messagingSenderId: "896847456980",
      appId: "1:896847456980:web:414c07e255e499cf2a2941",
      measurementId: "G-FVGG9341EH"
  
    };



  //Firebase configs for firebase, auth and database

  //firebase config info
  const app = initializeApp(firebaseConfig);

  //firebase auth info
  const provider = new GithubAuthProvider();
  const auth = getAuth();

    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
    });

    const logout_button = document.querySelector('.logout')
    logout_button.addEventListener('click', () => {
        signOut(auth)
            .then(() => {
            console.log('Sign out completed')
        })
        .catch((err) => {
        console.log(err.message)
        })
    })

    export default signInWithPopup;
    //export need things, unless using NPM is easier than this method
    //export {signInWithPopup(), errorCode, email, credential, errorCode, user, token, credential, auth
    //provider, userCredential, app};

