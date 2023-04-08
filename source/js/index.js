const mobileMenuToggleButton = document.querySelector('.toggle-menu');
mobileMenuToggleButton.addEventListener('click', () => {
  document.body.classList.toggle('page--mobile-menu');
});
