const sections = document.querySelectorAll(".store");

let currentIndex = 0;

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const enterBtn = document.getElementById("enterBtn");
const backToMall = document.getElementById("backToMall");


function showSection(index) {

    if (index < 0) {
        index = 0;
    }

    if (index >= sections.length) {
        index = sections.length - 1;
    }

    currentIndex = index;

    sections.forEach((section, i) => {

        if (i === currentIndex) {
            section.style.display = "block";
        } else {
            section.style.display = "none";
        }

    });

    updateButtons();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function updateButtons() {

    /* HOME PAGE */

    if (currentIndex === 0) {

        prevBtn.style.display = "none";
        nextBtn.style.display = "block";

    }

    /* CONTACT PAGE */

    else if (currentIndex === sections.length - 1) {

        prevBtn.style.display = "block";
        nextBtn.style.display = "none";

    }

    /* MIDDLE PAGES */

    else {

        prevBtn.style.display = "block";
        nextBtn.style.display = "block";

    }

}


/* NEXT BUTTON */

nextBtn.addEventListener("click", function () {

    if (currentIndex < sections.length - 1) {

        showSection(currentIndex + 1);

    }

});


/* PREVIOUS BUTTON */

prevBtn.addEventListener("click", function () {

    if (currentIndex > 0) {

        showSection(currentIndex - 1);

    }

});


/* ENTER MALL BUTTON */

if (enterBtn) {

    enterBtn.addEventListener("click", function () {

        showSection(1);

    });

}


/* BACK TO KRISHA'S MALL BUTTON */

if (backToMall) {

    backToMall.addEventListener("click", function () {

        showSection(0);

    });

}


/* DIRECTORY BUTTONS */

document.querySelectorAll("[data-target]").forEach(function (button) {

    button.addEventListener("click", function () {

        const target = this.getAttribute("data-target");

        const targetSection = document.getElementById(target);

        if (targetSection) {

            const index = Array.from(sections).indexOf(targetSection);

            if (index !== -1) {

                showSection(index);

            }

        }

    });

});


/* NAVBAR BUTTONS */

document.querySelectorAll(".nav-link").forEach(function (link) {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        const target = this.getAttribute("data-target");

        const targetSection = document.getElementById(target);

        if (targetSection) {

            const index = Array.from(sections).indexOf(targetSection);

            if (index !== -1) {

                showSection(index);

            }

        }

    });

});


/* START FROM HOME */

showSection(0);
