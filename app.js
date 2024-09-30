document.addEventListener("DOMContentLoaded", function() {
    const hiddenElements = document.querySelectorAll('.hidden');
    const approvedGIP = document.getElementById('approvedGIP');
    const partnerAgencies = document.getElementById('partnerAgencies');
    const absorbedGIP = document.getElementById('absorbedGIP');
    const navbarTitle = document.getElementById('navbar-title'); // Add this line

    let numbersAnimated = false; // To ensure numbers animate only once

    // Function to reveal hidden elements when scrolling
    function reveal() {
        const windowHeight = window.innerHeight;

        hiddenElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - 50) { // 50px offset for visibility
                element.classList.add('show');
                element.classList.remove('hidden');

                // Check if the current section is "GIP BY NUMBERS"
                if (element.classList.contains('gipsec') && !numbersAnimated) {
                    animateNumbers(); // Start number animation
                    numbersAnimated = true; // Prevent further animations
                }
            }
        });
    }

    // Function to animate GIP numbers
    function animateNumbers() {
        approvedGIP.innerHTML = 986;
        partnerAgencies.innerHTML = 574;
        absorbedGIP.innerHTML = 23;
    }

    // Navbar scroll behavior
    window.onscroll = function() {
        var navbar = document.getElementById("navbar");
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
            navbarTitle.classList.remove('d-none'); // Show the title
            navbarTitle.style.opacity = '1'; // Ensure it's visible
        } else {
            navbar.classList.remove("scrolled");
            navbarTitle.classList.add('d-none'); // Hide the title
            navbarTitle.style.opacity = '0'; // Ensure it's hidden
        }
    };

    // Attach the scroll event for revealing elements
    window.addEventListener('scroll', reveal);

    // Intersection Observer to animate sections when they enter the viewport
    const sections = document.querySelectorAll('section');

    const options = {
        root: null, // Use the viewport as the root
        threshold: 0.1 // Trigger when 10% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, options);

    // Observe each section for animations
    sections.forEach(section => {
        observer.observe(section);
    });
});
