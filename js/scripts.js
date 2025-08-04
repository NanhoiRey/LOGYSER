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
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
      link.addEventListener("click", function (e) {
        // Si este link es el toggle del submenú, NO cierres el menú
        if (link.classList.contains('dropdown-toggle')) {
          e.preventDefault(); // (esto ya lo haces en el otro handler)
          return;
        }
        closeMenu();
      });
    });
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

  // Dropdown (submenú Servicios) por click
  const serviciosParent = document.querySelector('.nav-item-has-dropdown');
  const serviciosToggle = serviciosParent ? serviciosParent.querySelector('.dropdown-toggle') : null;
  if (serviciosToggle && serviciosParent) {
    serviciosToggle.addEventListener('click', function (e) {
      // Solo prevenir si es link principal de servicios
      e.preventDefault();
      // Cerrar cualquier otro dropdown abierto
      document.querySelectorAll('.nav-item-has-dropdown').forEach(item => {
        if (item !== serviciosParent) item.classList.remove('active');
      });
      serviciosParent.classList.toggle('active');
    });

    // Cierra el submenú si haces click fuera
    document.addEventListener('click', function (e) {
      if (!serviciosParent.contains(e.target)) {
        serviciosParent.classList.remove('active');
      }
    });
  }

  // Acordeón: disponible globalmente
  window.toggleItem = function (element) {
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
document.addEventListener('DOMContentLoaded', function () {
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