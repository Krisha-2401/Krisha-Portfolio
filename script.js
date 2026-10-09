// Krisha Patel portfolio — vanilla JS
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  // Current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Reveal on scroll (content stays visible if IntersectionObserver is missing)
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Close the mobile menu after choosing a link
  var menu = document.getElementById('menu');
  var links = document.querySelectorAll('.nav-link');
  links.forEach(function (a) {
    a.addEventListener('click', function () {
      if (menu.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(menu).hide();
    });
  });

  // Active nav link while scrolling
  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && map[e.target.id]) {
          links.forEach(function (l) { l.classList.remove('active'); });
          map[e.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) so.observe(s);
    });
  }

  // Back-to-top button appears after scrolling
  var toTop = document.getElementById('toTop');
  function toggleTop() { toTop.classList.toggle('show', window.scrollY > 600); }
  window.addEventListener('scroll', toggleTop, { passive: true });
  toggleTop();
})();
