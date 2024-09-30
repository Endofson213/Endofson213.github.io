// Import necessary Firebase modules (Modular style)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB16sNysLRzhQjww9it86rXEXpTKjiXuHE",
  authDomain: "authentication-3f79b.firebaseapp.com",
  databaseURL: "https://authentication-3f79b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "authentication-3f79b",
  storageBucket: "authentication-3f79b.appspot.com",
  messagingSenderId: "1017764485191",
  appId: "1:1017764485191:web:9e7bce8654b02313bcb962"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Handle Login Form Submission
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form from refreshing the page

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Sign in user with Firebase Auth
    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user;

            // Optional: Save user data in Firestore
            setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                lastLogin: serverTimestamp()
            }, { merge: true })
            .then(() => {
                console.log("User data updated in Firestore");
                alert('Login successful!');
                // Redirect to the home page (index.html)
                window.location.href = 'index.html';
            })
            .catch(error => {
                console.error("Error updating Firestore: ", error);
            });
        })
        .catch(error => {
            console.error("Login Error: ", error.message);
            alert('Login failed: ' + error.message);
        });
});

// Handle Google Sign-In
document.getElementById('SignInWithGoogle').addEventListener('click', () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
        .then(result => {
            const user = result.user;

            // Register or update user in Firestore
            setDoc(doc(db, 'users', user.uid), {
                name: user.displayName,
                email: user.email,
                profilePic: user.photoURL,
                lastLogin: serverTimestamp()
            }, { merge: true })
            .then(() => {
                console.log("User successfully signed in and stored!");
                // Redirect to the home page (index.html)
                window.location.href = 'index.html';
            })
            .catch(error => {
                console.error("Error storing user data: ", error);
            });
        })
        .catch(error => {
            console.error("Google Sign-In Error: ", error.message);
            alert('Google Sign-In failed: ' + error.message);
        });
});

// Monitor Auth State
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is logged in, redirect to index.html if not already on it
        console.log('User is logged in');
        window.location.href = 'index.html';
    }
});