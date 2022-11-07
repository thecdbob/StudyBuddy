

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
            //not used 
                //connectAuthEmulator, //dev only, remove before pushing
                //signInWithEmailAndPassword, //probably dev only

    //auth libraries
    import { 
      getAuth, 
      onAuthStateChanged, 
      GithubAuthProvider, 
      signInWithPopup, 
      signOut
     } 
    from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js"
    //Firebase SDKs
    
    //import firestore library
    import { 
      getFirestore,
      collection,
      doc,
      addDoc,
      getDoc,
      deleteDoc,
      setDoc,
      onSnapshot,
      query,
      where,
      getDocs,
      orderBy,
      serverTimestamp,
      updateDoc,
      limit
     } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js"

    //bunch of functions for firestore

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
  //dev only
  //connectAuthEmulator(auth, "https://localhost:9099");

  //db related
  const db = getFirestore(app);
  


  //DB FUNCTIONS HERE

  //collections of objects in firebase
  //currently we have three collections, Groups, Tasks, Types
  const GroupCollection = collection(db, 'Groups');
  const TypeCollection = collection(db, 'Types');
  const TasksCollection = collection(db, 'Tasks');

  //used to get different items from database (Groups, Tasks, Types)
  //probably useful for when we create objects
  getDocs(GroupCollection)
        //a promise    
        .then((snapshot) => {
          let groups_display_array = []
          snapshot.docs.forEach((doc) => {
            //the id could be useful for the buttons
            groups_display_array.push({...doc.data(), id: doc.id})
          })
        console.log(groups_display_array)
      })
      .catch(err => {
        console.log(err.message)
      })
  
  getDocs(TypeCollection)
    //a promise    
    .then((snapshot) => {
        let types_display_array = []
        snapshot.docs.forEach((doc) => {
          //the id could be useful for the buttons
          types_display_array.push({...doc.data(), id: doc.id})
        })
      console.log(types_display_array)
    })
    .catch(err => {
      console.log(err.message)
    })

  getDocs(TasksCollection)
    //a promise    
    .then((snapshot) => {
        let types_display_array = []
        snapshot.docs.forEach((doc) => {
          //the id could be useful for the buttons
          types_display_array.push({...doc.data(), id: doc.id})
        })
      console.log(types_display_array)
    })
    .catch(err => {
      console.log(err.message)
    })

  //even # of elements, collection, doc (always even number)
  //const add_task_to_db

  //const add_task_to_db



    //add items to database
    
    //add group
    const addGroupForm = document.querySelector('.create_group')
    addGroupForm.addEventListener('submit', (e) => {
        //prevents page refresh
        e.preventDefault()

        addDoc(GroupCollection, {
            Colour: addGroupForm.GroupColour.value,
            Name: addGroupForm.GroupName.value,
            time_created: serverTimestamp(),
            time_modified: serverTimestamp()     
        })
        .then(() => {
            //reset box for more input
            addGroupForm.reset()
        })
    })

    //add task
    const addTaskForm = document.querySelector('.create_task')
    addTaskForm.addEventListener('submit', (e) => {
        //prevents page refresh
        e.preventDefault()

        addDoc(TasksCollection, {
            Group: addTaskForm.Group.value,
            Name: addTaskForm.TaskName.value,
            Type: addTaskForm.Type.value,       
            date_due: addTaskForm.DateDue.value,
            time_created: serverTimestamp(),
            time_modified: serverTimestamp(),
            Completed: false
        })
        .then(() => {
            //reset box for more input
            addTaskForm.reset()
        })
    })

    //delete task
    const removeTaskForm = document.querySelector('.remove_task')
    removeTaskForm.addEventListener('submit', (e) => {
            //prevents page refresh
            e.preventDefault()

            const docRef = doc(db, 'Tasks', removeTaskForm.TaskID.value)

            deleteDoc(docRef)
            .then(() => {
            removeTaskForm.reset()
        })
    })
    
    
    //Realtime Data Collection
    //probably used for main screen, to display groups and tasks

    //Realtime Groups
    
    onSnapshot(GroupCollection, (snapshot) => {
    let groups_display_array_rt = []
    snapshot.docs.forEach((doc) => {
    //the id could be useful for the buttons
    groups_display_array_rt.push({...doc.data(), id: doc.id})
    })
    console.log(groups_display_array_rt)
    })

    //Realtime Tasks
    onSnapshot(TasksCollection, (snapshot) => {
    let task_display_array_rt = []
    snapshot.docs.forEach((doc) => {
    //the id could be useful for the buttons
    task_display_array_rt.push({...doc.data(), id: doc.id})
    })
    console.log(task_display_array_rt)
    })
    
    



    //Querries (Searches the Database)
    //probably have to build index as well

    //I think we could link these to buttons to find certain things
    const group_query = query(GroupCollection, where("name", "==", "nametofind"))


    //or to order certain things by a certain field
    const task_time_query = query(TasksCollection, where("name", "==", "nametofind"), orderBy('Date Due', 'desc'))






    //Getting Single Document (Maybe for getting tasks?)
    
    //not sure how to get id of this kind of object
    //const docRef = doc(db, 'Types', 'ID')








    //Editing/Updating Items

    const completedTaskEdit = document.querySelector('.completeTask')
    completedTaskEdit.addEventListener('submit', (e) => {
        e.preventDefault()

        const docRef = doc(db, 'Tasks', completedTaskEdit.TaskID.value)

        updateDoc(docRef, {
            Completed: true,
            time_modified: serverTimestamp()
        })
        .then(() => {
            completedTaskEdit.reset()
        })
    })


    





  //AUTH FUNCTIONS BELOW HERE

  //testing only, email/pw auth methods
  //const loginEmailPassword = async () => {
  //const loginEmail = txtEmail.value;
  //const loginPassword = txtPassword.value;

    //const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginEmailPassword);
    //console.log(userCredential.user);
  



  /*
  function user_sign_in(){
      loginEmailPassword
      console.log("hi");
    }
    */

 // btnLogin.addEventListener("click", loginEmailPassword);

  //this eventually will be the Github authfunction we will use
  

    /*
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
    */


    //login

    const loginButton = document.querySelector('.loginb')
    loginButton.addEventListener('click', (e) =>  {
        e.preventDefault()

        signInWithPopup(auth, provider)
            .then((result) => {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            // The signed-in user info.
            const user = result.user;
            // ...
            })
            .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GithubAuthProvider.credentialFromError(error);
            // ...
            })
        })


    //logout


    const logoutButton = document.querySelector('.logoutb')
    logoutButton.addEventListener('click', () =>  {
        signOut(auth)
            .then(() => {
                //console.log('Signed Out')
            })
            .catch((err) => {
                console.log(err.message)
            })
    
    })


    //auth state 

    const showApp = () => {
      document.getElementById("login").style.display = 'none'
      document.getElementById('app').style.display = 'block'
    }

    const showLoginForm = () => {
      document.getElementById('login').style.display = 'block'
      document.getElementById('app').style.display = 'none'  
    }

    const monitorAuthState = async () => {
      onAuthStateChanged(auth, (user) => {
        console.log('user status changed', user)
        if (user) {
          showApp()
      }
      else {
        showLoginForm()
      }
      });
    }

    monitorAuthState()

    
    

    
    //things that should be in another file but aren't
    
    //our little thing to put in the top right corner to show the logged in user
    /*
    const showLoginState = (user) => {
      lblAuthState.innerHTML = `You're logged in as ${user.displayName}`
    }
    */



    /*
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
*/

/*
    const monitor_auth_state = async () => {
    onAuthStateChanged(auth, user => {
        if(user) {
            console.log(user);
            ShowApp();

            hideLoginError();
        }
        else {
            showLoginForm();
            AuthState.innerHTML = "You're not logged in.";
        }
    });
    
    */

    //btnLogin.addEventListener("click", signInWithPopup)
    //btnLogOut.addEventListener("click", logout)
    //export default signInWithPopup;
    //export need things, unless using NPM is easier than this method
    //export {signInWithPopup(), errorCode, email, credential, errorCode, user, token, credential, auth
    //provider, userCredential, app};

