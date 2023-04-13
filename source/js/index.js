const html = document.querySelector('.page');
const mobileMenuToggleButton = html.querySelector('.toggle-menu');

mobileMenuToggleButton?.addEventListener('click', () => {
  html.classList.toggle('page--mobile-menu');
  mobileMenuToggleButton.ariaExpanded = html.classList.contains('page--mobile-menu');
});
