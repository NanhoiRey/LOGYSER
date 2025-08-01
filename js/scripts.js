const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}


// when we click on hamburger icon its close 

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

document.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');

  if (window.scrollY > 0) {
    navbar.classList.add('scrolled');
  }
  else {
    navbar.classList.remove('scrolled');
  }


});


// Consumo del JSON de carpeta DATA

fetch('./data/services.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('services-container');
    data.forEach(service => {
      const card = document.createElement('div');
      card.classList.add('service-card');
      card.innerHTML = `
        <div class="card-image" style="background-image: url(${service.backgroundImage});">
          <div class="icon-wrapper">${service.icon}</div>
        </div>
        <div class="card-content">
          <div class="card-title">${service.title}</div>
          <button class="minimal-button">Ver más</button>
        </div>
      `;
      container.appendChild(card);
    });
  });
