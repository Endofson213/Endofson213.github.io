document.addEventListener('DOMContentLoaded', function() {
    const userEmail = localStorage.getItem('userEmail');

    if (userEmail) {
        document.getElementById('userEmailPlaceholder').textContent = userEmail;
    } else {
        document.getElementById('userEmailPlaceholder').textContent = 'No email found';
    }
});