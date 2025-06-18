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



const MOBS_API_URL = 'https://684a4f1f165d05c5d35845a3.mockapi.io/api/v1/mobs_pasivos-neutrales'; 

// Función para cargar los mobs desde la API
async function loadMobs() {
    const container = document.getElementById('mobsContainer');
    container.innerHTML = '<p>Cargando mobs...</p>';

    try {
        const response = await fetch(MOBS_API_URL);
        if (!response.ok) throw new Error("Error al cargar los datos");

        const mobs = await response.json();

        // Limpiar mensaje de carga
        container.innerHTML = '';

        // Generar tarjetas
        mobs.forEach(mob => {
            const card = document.createElement('div');
            card.classList.add('mob-card');

            card.innerHTML = `
                <h3>${mob.name}</h3>
                <p><strong>Tipo:</strong> ${mob.type}</p>
                <p><strong>Salud:</strong> ${mob.health} HP</p>
                <p><strong>Ubicación:</strong> ${mob.location} HP</p>
                <p><strong>Descripción:</strong> ${mob.description}</p>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        container.innerHTML = `<p style="color:red;">No se pudieron cargar los mobs: ${error.message}</p>`;
    }
}

// Llamar a la función cuando se cargue la página
document.addEventListener("DOMContentLoaded", () => {
    // El resto de tu código...

    // Cargar mobs si estamos en la sección correspondiente
    if (document.getElementById('mobsContainer')) {
        loadMobs();
    }
});

document.addEventListener("DOMContentLoaded", () => {
  const biomeCards = document.querySelectorAll(".biome-card");

  biomeCards.forEach(card => {
      card.addEventListener("click", () => {
          card.classList.toggle("flipped");
      });
  });
});

// Function to load biome cards
async function loadBiomesFromJSON() {
    const container = document.getElementById('biomasContainer');
    container.innerHTML = '<p>Cargando biomas...</p>';

    try {
        // Cargar el archivo JSON
        const response = await fetch('/js/biomas.json'); // Ajusta la ruta según tu estructura de archivos
        if (!response.ok) throw new Error('No se pudo cargar el archivo JSON');

        const data = await response.json();
        const biomes = data.biomes; // Acceder al array de biomas

        container.innerHTML = ''; // Limpiar el contenedor antes de agregar las nuevas tarjetas

        // Iterar sobre cada biome y crear una tarjeta
        biomes.forEach(biome => {
            const card = document.createElement('div');
            card.classList.add('card');

            // Construir el contenido de la tarjeta
            card.innerHTML = `
                <img src="${biome.image}" alt="${biome.name}">
                <h3>${biome.name}</h3>
                <p><strong>Temperatura:</strong> ${biome.temperature}</p>
                <p><strong>Características:</strong> ${biome.features.join(', ')}</p>
                <p>${biome.description}</p>
            `;

            // Agregar la tarjeta al contenedor
            container.appendChild(card);
        });

    } catch (error) {
        container.innerHTML = `<p style="color:red;">Error cargando biomas: ${error.message}</p>`;
    }
}

// Llamar a la función cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    loadBiomesFromJSON();
});


