class MiMenu extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <style>
nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.85);
    padding: 15px 30px;
    z-index: 1;
}

.menu {
    display: flex;
    justify-content: flex-start;
    gap: 8px;
    list-style: none;
}

.menu li {
    position: relative;
}

.menu li a {
    color: white;
    text-decoration: none;
    font-weight: 600;
    font-size: 17px;
    padding: 8px 5px;
    transition: color 0.3s ease, background 0.3s ease;
    display: block;
    border-radius: 4px;
}

.menu li a:hover {
    color: #ffcc00;
    background-color: rgba(255, 255, 255, 0.1);
}

.dropdown-content {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #222; 
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    z-index: 1;
    border-radius: 6px;
    animation: fadeIn 0.2s ease-in-out;
}

.dropdown-content a {
    color: white;
    padding: 10px 20px;
    display: block;
    font-size: 15px;
    transition: background 0.3s ease, color 0.3s ease;
    list-style: none;
}

.dropdown-content a:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #ffcc00;
}

.dropdown:hover .dropdown-content {
    display: block;
}


/* Media Query para pantallas pequeñas */
@media (max-width: 750px) {
    nav {
        padding: 10px;
    }

    .menu li:first-child {
        display: block;
    }

    .dropdown-content {
        display: none;
    }

    .dropdown:hover .dropdown-content {
        display: block;
    }

    .menu li a {
        font-size: 14px;
    }
}
            </style>

            <nav>
                <ul class="menu">
                    <li><a href="#home">Página Principal</a></li>
                    <li class="dropdown">
                        <a href="#mundo">Mundos</a>
                        <div class="dropdown-content">
                            <a href="#items">Items ▼</a>
                            <a href="#armaduras">Armaduras</a>
                            <a href="#alimentos">Alimentos</a>
                            <a href="#herramientas">Herramientas</a>
                            <a href="#materiales">Materiales</a>
                            <a href="#decoraciones">Decoraciones</a>
                            <a href="#transporte">Transporte</a>
                            <a href="#pociones">Pociones</a>
                            <a href="#generadores">Generadores</a>
                            <a href="#archivos">Archivos</a>
                        </div>
                    </li>
                    <li><a href="#mods">Mods</a></li>
                    <li><a href="#mobs">Mobs</a></li>
                    <li class="dropdown">
                        <a href="#biomes">Biomas ▼</a>
                        <div class="dropdown-content">
                            <a href="#overworld">Overworld</a>
                            <a href="#nether">Nether</a>
                            <a href="#end">End</a>
                        </div>
                    </li>
                </ul>
            </nav>
        `;
    }
}

customElements.define('mi-menu', MiMenu);
