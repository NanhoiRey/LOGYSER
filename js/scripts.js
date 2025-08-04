function mainScripts() {
  // Hamburger
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", mobileMenu);

    function mobileMenu() {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    }

    // Nav Links
    const navLink = document.querySelectorAll(".nav-link");
    navLink.forEach(n => n.addEventListener("click", closeMenu));

    function closeMenu() {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  }

  // Scroll Navbar
  document.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // Acordeón: disponible globalmente
  window.toggleItem = function(element) {
    const item = element.parentElement;
    const boton = element.querySelector('.toggle');
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.item').forEach(i => {
      i.classList.remove('active');
      i.querySelector('.toggle').textContent = '+';
    });
    if (!isActive) {
      item.classList.add('active');
      boton.textContent = '-';
    }
  };
}

// Resto del código (fetch JSON, etc.) sigue igual...
document.addEventListener('DOMContentLoaded', function() {
  fetch('./data/services.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('services-container');
      if (container) {
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
      }
    });
});