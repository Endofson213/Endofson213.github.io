const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});



const section1 = document.querySelectorAll('.section1');
section1.forEach((el)=> observer.observe(el));
const section2 = document.querySelectorAll('.section2');
section2.forEach((el)=> observer.observe(el));
const section3 = document.querySelectorAll('.section3');
section3.forEach((el)=> observer.observe(el));