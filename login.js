// After successful Google Sign-In
signInWithPopup(auth, provider)
    .then(result => {
        const user = result.user;
        const email = user.email;

        // Store the email in localStorage (or sessionStorage)
        localStorage.setItem('userEmail', email);

        // Redirect to loggedIn.html
        window.location.href = 'loggedIn.html';
    })
    .catch(error => {
        console.error("Google Sign-In Error: ", error.message);
        alert('Google Sign-In failed: ' + error.message);
    });
