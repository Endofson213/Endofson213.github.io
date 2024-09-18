const odometerElements = document.querySelectorAll('.odometer'); // Select all odometer elements
let hasUpdatedOdometer = false; // Prevent multiple updates

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');

            // Update the odometer values only once when the section comes into view
            if (!hasUpdatedOdometer) {
                hasUpdatedOdometer = true; // Prevent multiple updates

                // Define the target values
                const targets = {
                    approvedGIP: 823, // Update with the actual value
                    partnerAgencies: 234,
                    absorbedGIP: 123,
                };

                // Update each odometer
                odometerElements.forEach((odometer) => {
                    const id = odometer.id;
                    const targetValue = targets[id];
                    if (targetValue !== undefined) {
                        updateOdometer(odometer, targetValue, 8000); // Update each odometer
                    }
                });
            }
        }
    });
});

const sections = document.querySelectorAll('.section1, .section2, .section3, .section4');
sections.forEach((el) => observer.observe(el));

// Function to animate the odometer value
function updateOdometer(odometer, targetValue, duration) {
    const startValue = 0;
    const startTime = performance.now();

    const update = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1); // Limit progress to 1 (100%)
        const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);

        odometer.innerHTML = currentValue.toLocaleString(); // Update the odometer display

        if (progress < 1) {
            requestAnimationFrame(update); // Continue updating
        }
    };

    requestAnimationFrame(update); // Start the animation
}