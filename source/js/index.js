const mobileMenuToggleButton = document.querySelector('.toggle-menu');
const nav = document.querySelector('.nav');

mobileMenuToggleButton?.addEventListener('click', () => {
  nav.classList.toggle('nav--opened');

  if (nav.classList.contains('nav--opened')) {
    mobileMenuToggleButton.ariaExpanded = true;
  } else {
    mobileMenuToggleButton.ariaExpanded = false;
  }
});
