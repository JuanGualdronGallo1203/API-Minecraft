document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav ul li a");

  // Función para resaltar el enlace activo
  function highlightActiveLink() {
    let currentSection = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 80; // Ajuste según altura de tu navbar
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  // Desplazamiento suave al hacer clic en los enlaces
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault(); // Evita el salto brusco

      const targetId = link.getAttribute("href"); // Ejemplo: #worlds
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 70, // Ajuste para no quedar debajo de la barra
          behavior: "smooth"
        });
      }
    });
  });

  // Escuchar scroll para actualizar el enlace activo
  window.addEventListener("scroll", highlightActiveLink);

  // También ejecutar una vez al cargar la página
  highlightActiveLink();
});