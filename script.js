// Scroll to Top Button

const scrollBtn = document.getElementById("scroll-top");

// Show button after scrolling 300px
window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {
        scrollBtn.style.display = "flex";
    } else {
        scrollBtn.style.display = "none";
    }

});

// Scroll to top smoothly
scrollBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});