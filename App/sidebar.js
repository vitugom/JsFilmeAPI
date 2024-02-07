import { conectaAPI } from "./conectaAPI.js"

const btnExpandirMenu = document.querySelector("[data-expandir-menu]")
const btnContrairMenu = document.querySelector("[data-contrair-menu]")
const MenuLateral = document.querySelector(".menu")
const containerCateg = document.querySelector('.menu__categ-container')

btnExpandirMenu.addEventListener("click", abrirMenu)

btnContrairMenu.addEventListener("click", fecharMenu)

function abrirMenu(){
    const MenuLateral = document.querySelector(".menu")
    MenuLateral.style.left = '0px'
}

function fecharMenu(){
    const MenuLateral = document.querySelector(".menu")
    MenuLateral.style.left = '-300px'
}



function constroiMenuLateralGeneros(id, nome){
    const elementoDaLista = document.createElement('li')
    elementoDaLista.className = 'menu__itens-categoria'
    elementoDaLista.innerHTML = 
    `
    <i class="fa-solid fa-circle"></i><a href="filmeCateg.html?categId=${id}">${nome}</a>
    `
    return elementoDaLista
}

async function listarCategoriasMenuLateral(){
    try{
        const listaApi = await conectaAPI.buscarListaDeGenero()
        listaApi.genres.forEach(elemento => {
            containerCateg.appendChild(constroiMenuLateralGeneros(elemento.id, elemento.name))
        })
    } catch {
        containerCateg.innerHTML = `<h2>Erro ao conectar com API</h2>`
    }
}

listarCategoriasMenuLateral()



