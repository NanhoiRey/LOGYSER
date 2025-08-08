function mainScripts() {
  // Menú hamburguesa
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  // Dropdown Servicios
  const serviciosParent = document.querySelector('.nav-item-has-dropdown');
  const serviciosLink = serviciosParent ? serviciosParent.querySelector('.servicios-link') : null;

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
      link.addEventListener("click", function (e) {
        // En móviles, los enlaces del menú hamburguesa cierran el menú
        if (window.innerWidth <= 768) {
          hamburger.classList.remove("active");
          navMenu.classList.remove("active");
        }
      });
    });
  }

  // Sticky navbar
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

  if (serviciosParent && serviciosLink) {
    // La lógica de hover se maneja en el CSS para desktop.
    // El enlace "Servicios" siempre navega a su página en desktop.
    // No es necesario añadir un event listener para el clic en desktop, ya que el link funciona por defecto.
    // La versión móvil no tiene dropdown, los elementos se muestran siempre.

    // Cierra el menú al hacer clic fuera del mismo, solo en desktop (cuando hay dropdown)
    document.addEventListener('click', function (e) {
      if (
        window.innerWidth > 768 &&
        !serviciosParent.contains(e.target) &&
        serviciosParent.classList.contains('active')
      ) {
        serviciosParent.classList.remove('active');
      }
    });
  }

  // Acordeón
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

// Includes para nav y footer
function includeHTML(id, url, callback) {
  fetch(url)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
      if (callback) callback();
    })
    .catch(err => console.error('Error al incluir', url, err));
}

document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('include-nav')) {
    includeHTML('include-nav', 'nav.html', function() {
      mainScripts();
    });
  }
  if (document.getElementById('include-footer')) {
    includeHTML('include-footer', 'footer.html');
  }
});

// Fetch servicios para cards
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

// Swiper carrusel marcas
document.addEventListener('DOMContentLoaded', function () {
  if (typeof Swiper !== "undefined") {
    const swiper = new Swiper('.brands-swiper', {
      slidesPerView: window.innerWidth < 900 ? 2 : 4,
      spaceBetween: 10,
      loop: true,
      autoplay: { delay: 2500 },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    });

    window.addEventListener('resize', () => {
      swiper.params.slidesPerView = window.innerWidth < 900 ? 2 : 4;
      swiper.update();
    });
  }
});