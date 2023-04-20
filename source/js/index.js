const toggleMenu = document.querySelector('.toggle-menu');
const nav = document.querySelector('.nav');

nav?.classList.remove('nav--nojs');

toggleMenu?.addEventListener('click', () => {
  nav.classList.toggle('nav--opened');

  if (nav.classList.contains('nav--opened')) {
    toggleMenu.ariaExpanded = true;
  } else {
    toggleMenu.ariaExpanded = false;
  }
});
