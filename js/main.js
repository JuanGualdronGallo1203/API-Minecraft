document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav ul li a");

  // Altura de la barra de navegación
  const navbarHeight = document.querySelector("nav")?.offsetHeight || 60;

  function highlightActiveLink() {
    let currentSection = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - navbarHeight;
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

  // Scroll suave al hacer clic en enlaces
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - navbarHeight,
          behavior: "smooth"
        });
      }
    });
  });

  window.addEventListener("scroll", highlightActiveLink);
  highlightActiveLink(); // Ejecutar al cargar
  window.scrollTo(0, 0);  // Forzar scroll al inicio
});