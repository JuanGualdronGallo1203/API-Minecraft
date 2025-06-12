
/*Cambio de paginas*/

const pagina1 = document.getElementById("home");
const pagina2 = document.getElementById("worlds");
let 
let boton = document.getElementById("");
boton.addEventListener("click",cambioPagina1);
function cambioPagina1(){
    pagina1.classList.replace("paginita","ocultar");
    pagina2.classList.replace("ocultar","paginita");
}