const API_URL = "https://684a4f1f165d05c5d35845a3.mockapi.io/api/v1/mob-pasivo"; // Reemplaza con tu URL real

let mobsData = [];

async function loadMobs() {
const response = await fetch(API_URL);
mobsData = await response.json();
}

function createMobCard(mob) {
const card = document.createElement("div");
card.classList.add("flip-card");

  // Cara frontal
const front = document.createElement("div");
front.classList.add("card-front");

const image = document.createElement("img");
image.src = `https://via.placeholder.com/300x200?text=${encodeURIComponent(
    mob.nombre
)}`;
image.alt = mob.nombre;

const bodyFront = document.createElement("div");
bodyFront.classList.add("card-body");

const title = document.createElement("h3");
title.textContent = mob.nombre;

const type = document.createElement("p");
type.textContent = `Tipo: ${mob.tipo}`;

const buttonFlip = document.createElement("button");
buttonFlip.textContent = "Ver detalles";
buttonFlip.onclick = () => toggleFlip(card);

bodyFront.appendChild(title);
bodyFront.appendChild(type);
bodyFront.appendChild(buttonFlip);

front.appendChild(image);
front.appendChild(bodyFront);

  // Cara trasera
const back = document.createElement("div");
back.classList.add("card-back");

const bodyBack = document.createElement("div");
bodyBack.classList.add("card-body");

const detailsTitle = document.createElement("h3");
detailsTitle.textContent = "Detalles";

const description = document.createElement("p");
description.textContent = mob.descripcion;

const health = document.createElement("p");
health.textContent = `Vida: ${mob.vida}`;

const buttonNext = document.createElement("button");
buttonNext.textContent = "Cerrar";
buttonNext.onclick = () => toggleFlip(card);

bodyBack.appendChild(detailsTitle);
bodyBack.appendChild(description);
bodyBack.appendChild(health);
bodyBack.appendChild(buttonNext);

back.appendChild(bodyBack);

  // Agregar caras a la tarjeta
card.appendChild(front);
card.appendChild(back);

return card;
}

function toggleFlip(card) {
card.classList.toggle("flipped");
}

function showMobsSection() {
const container = document.getElementById("mob-cards-container");
container.style.display = "flex"; // Muestra el contenedor

  // Si ya hay tarjetas, no necesitamos cargarlos otra vez
if (container.childElementCount === 0) {
    mobsData.forEach((mob) => {
    const card = createMobCard(mob);
    container.appendChild(card);
    });
}
}

// Event listener para el botón "Mobs"
document
.querySelector('a[href="#mobs"]')
.addEventListener("click", async () => {
    await loadMobs(); // Carga los datos de la API
    showMobsSection(); // Muestra las tarjetas
});

// Cargar datos al iniciar
window.onload = () => {
  loadMobs(); // Pre-carga los datos de la API
};





document.addEventListener("DOMContentLoaded", () => {
    const content = document.querySelector("#content");
    const links = document.querySelectorAll(".menu a");
    // Datos simulados de cada sección
    const pages = {
    "initial-page": `
        <section class="page active">
        <h2>Bienvenido a la API de Minecraft</h2>
        <p>Explora mobs, items, mods y biomas de forma dinámica.</p>
        </section>
    `,
    mobs: `
        <section class="page" id="mobs-section">
        <h2>Mobs Pasivos</h2>
        <div class="card-container" id="mob-cards-container"></div>
        </section>
    `,
    items: `
        <section class="page">
        <h2>Items</h2>
        <p>Contenido sobre los items de Minecraft.</p>
        </section>
    `,
    mods: `
        <section class="page">
        <h2>Mods</h2>
        <p>Información sobre mods populares de Minecraft.</p>
        </section>
    `,
    biomes: `
        <section class="page">
        <h2>Biomas</h2>
        <p>Lista de biomas disponibles en Minecraft.</p>
        </section>
    `
    };

    let currentId = "initial-page";
    let mobsLoaded = false;

    // Cargar página inicial
    content.innerHTML = pages[currentId];

    // Manejar clicks en el menú
    links.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const pageId = link.getAttribute("href").substring(1); // Elimina el '#'
        navigateTo(pageId);
    });
    });

    function navigateTo(pageId) {
    if (currentId === pageId) return;

      // Marcar el botón activo
    links.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${pageId}`) {
        link.classList.add("active");
        }
    });

      // Insertar nueva página si no existe
    let newPage = document.getElementById(`page-${pageId}`);
    if (!newPage) {
        const temp = document.createElement("div");
        temp.innerHTML = pages[pageId];
        newPage = temp.querySelector(".page");
        newPage.id = `page-${pageId}`;
        content.appendChild(newPage);
    }

      // Obtener las páginas actuales
    const currentPage = document.querySelector(".page.active");
    const nextPage = newPage;

      // Determinar dirección de la animación
    const direction = Array.from(links).findIndex(link => link.getAttribute("href") === `#${currentId}`) <
                        Array.from(links).findIndex(link => link.getAttribute("href") === `#${pageId}`)
                        ? "right"
                        : "left";

      // Aplicar animación
    currentPage.classList.remove("active");
    nextPage.classList.add("active");

    setTimeout(() => {
        currentPage.style.transform = direction === "right" ? "translateX(-100%)" : "translateX(100%)";
        nextPage.style.transform = "translateX(0)";
    }, 20);

      // Cargar mobs si es necesario
    if (pageId === "mobs" && !mobsLoaded) {
        fetchMobsAndRender();
    }

    currentId = pageId;
    }

    async function fetchMobsAndRender() {
    const API_URL = "https://tu-api-id.mockapi.io/api/v1/mobs";  // Reemplaza con tu URL real
    const container = document.getElementById("mob-cards-container");

    try {
        const response = await fetch(API_URL);
        const mobs = await response.json();

        mobs.forEach((mob) => {
        const card = createMobCard(mob);
        container.appendChild(card);
        });

        mobsLoaded = true;
    } catch (error) {
        console.error("Error al cargar los mobs:", error);
        container.innerHTML = "<p>No se pudieron cargar los mobs.</p>";
    }
    }

    function createMobCard(mob) {
    const card = document.createElement("div");
    card.classList.add("flip-card");

    const front = document.createElement("div");
    front.classList.add("card-front");

    const image = document.createElement("img");
    image.src = `https://via.placeholder.com/300x200?text=${encodeURIComponent(mob.nombre)}`;
    image.alt = mob.nombre;

    const bodyFront = document.createElement("div");
    bodyFront.classList.add("card-body");

    const title = document.createElement("h3");
    title.textContent = mob.nombre;

    const type = document.createElement("p");
    type.textContent = `Tipo: ${mob.tipo}`;

    const buttonFlip = document.createElement("button");
    buttonFlip.textContent = "Ver detalles";
    buttonFlip.onclick = () => toggleFlip(card);

    bodyFront.appendChild(title);
    bodyFront.appendChild(type);
    bodyFront.appendChild(buttonFlip);
    front.appendChild(image);
    front.appendChild(bodyFront);

    const back = document.createElement("div");
    back.classList.add("card-back");

    const bodyBack = document.createElement("div");
    bodyBack.classList.add("card-body");

    const detailsTitle = document.createElement("h3");
    detailsTitle.textContent = "Detalles";

    const description = document.createElement("p");
    description.textContent = mob.descripcion;

    const health = document.createElement("p");
    health.textContent = `Vida: ${mob.vida}`;

    const buttonNext = document.createElement("button");
    buttonNext.textContent = "Cerrar";
    buttonNext.onclick = () => toggleFlip(card);

    bodyBack.appendChild(detailsTitle);
    bodyBack.appendChild(description);
    bodyBack.appendChild(health);
    bodyBack.appendChild(buttonNext);
    back.appendChild(bodyBack);

    card.appendChild(front);
    card.appendChild(back);

    return card;
    }

    function toggleFlip(card) {
    card.classList.toggle("flipped");
    }
});