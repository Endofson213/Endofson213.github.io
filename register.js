// Your Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

// Firebase config object
const firebaseConfig = {
    apiKey: "AIzaSyD6435AchA27RVbsSHEYqpytnAf4w703Mc",
    authDomain: "login-93040.firebaseapp.com",
    projectId: "login-93040",
    storageBucket: "login-93040.appspot.com",
    messagingSenderId: "126428553297",
    appId: "1:126428553297:web:c835df171dd2d249831870"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// Handle form submission
const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const accountType = document.getElementById("RegisterDD").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("Username").value;
  const password = document.getElementById("Password").value;
  const confirmPassword = document.getElementById("ConfirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    // Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save additional user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      username: username,
      email: email,
      accountType: accountType
    });

    alert("Registration successful!");
    window.location.href = "login.html";  // Redirect after successful registration

  } catch (error) {
    console.error("Error during registration:", error);
    alert(`Error: ${error.message}`);
  }
});
