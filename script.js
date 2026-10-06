// Get the mall container, the list of sections, and the buttons
var mall = document.getElementById("mall");
var sections = document.querySelectorAll(".store");
var currentIndex = 0; // which section is showing now (0 = Home)

// Function: move the mall to a section by its position number
function goToSection(index) {
  if (index < 0) index = 0;                        // do not go before Home
  if (index > sections.length - 1) index = sections.length - 1; // do not go past Contact
  currentIndex = index;
  mall.scrollTo({ left: sections[index].offsetLeft, behavior: "smooth" });
}

// Function: find the section number from its id (used by menu links)
function goToId(id) {
  for (var i = 0; i < sections.length; i++) {
    if (sections[i].id === id) goToSection(i);
  }
}

// ENTER MALL button -> go to About (section 1)
document.getElementById("enterBtn").addEventListener("click", function () { goToSection(1); });

// PREVIOUS / NEXT buttons
document.getElementById("prevBtn").addEventListener("click", function () { goToSection(currentIndex - 1); });
document.getElementById("nextBtn").addEventListener("click", function () { goToSection(currentIndex + 1); });

// Navigation menu links and directory buttons: each has data-target = section id
var links = document.querySelectorAll("[data-target]");
links.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();                         // stop the page from jumping
    goToId(link.getAttribute("data-target"));
  });
});

// Keep currentIndex correct when the user scrolls by hand
mall.addEventListener("scroll", function () {
  currentIndex = Math.round(mall.scrollLeft / window.innerWidth);
});

// Mouse wheel: turn up/down scrolling into left/right movement
// (only when the mouse is not over a scrollable content area that needs it)
mall.addEventListener("wheel", function (e) {
  if (e.target.closest(".store") && e.target.closest(".store").scrollHeight > window.innerHeight) return;
  e.preventDefault();
  mall.scrollLeft += e.deltaY;
}, { passive: false });

// Contact form validation (frontend only - no backend, so nothing is really sent)
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var message = document.getElementById("message").value.trim();
  var msg = document.getElementById("formMsg");

  if (name === "" || email === "" || message === "") {
    msg.style.color = "red";
    msg.textContent = "Please fill in all fields.";
  } else {
    msg.style.color = "green";
    msg.textContent = "Thank you, " + name + "! (Demo form: message is not actually sent.)";
    this.reset();
  }
});