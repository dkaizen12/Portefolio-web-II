// Sélecteurs
const menuIcon = document.querySelector('#menu-icon');
const navbar   = document.querySelector('.navbar');
const overlay  = document.querySelector('.overlay');

// Ouverture/Fermeture du menu et overlay
menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
  overlay.classList.toggle('active');
});

// Fermer au clic sur l’overlay
overlay.addEventListener('click', () => {
  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');
  overlay.classList.remove('active');
});