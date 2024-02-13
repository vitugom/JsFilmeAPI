import { conectaAPI } from "./conectaAPI.js";

const containerListaFilmes = document.querySelector('.painel-filmes__container-filmes')

function constroiCardFilme(urlImagem, titulo, id){
    const filme = document.createElement("div")
    filme.className = "carrousel__card"
    filme.innerHTML = `
        <img class="card__imagem-filme" src="https://image.tmdb.org/t/p/original/${urlImagem}" alt="">
        <div class="card__conteudo">
            <h3 class="card__titulo-filme">${titulo}</h3>
            <div class="carrousel__card-opcoes">
                <a href="paginaFilme.html?id=${id}" class="carrousel__card-btn-ver-mais">Ver mais</a>
            </div>
        </div>        
    `
    
    return filme;
}

let listaFilmesFavoritos = JSON.parse(localStorage.getItem("filmesFavoritos")) || [];
let listaAssistirMaisTarde = JSON.parse(localStorage.getItem("AssistirMaisTarde")) || [];

async function mostrarFilmesFavoritados(){
    for(let id of listaFilmesFavoritos){
        try{
            let listaApi = await conectaAPI.mostrarFilmePorId(id)
            
            let listaApiArray = []

            listaApiArray.push(listaApi)

            console.log(listaApiArray)

            listaApiArray.forEach(filme => containerListaFilmes.appendChild(constroiCardFilme(filme.poster_path, filme.title, filme.id)))
        
        }catch{
            containerListaFilmes.innerHTML = '<h1>N FUNFOU</h1>'
        }
    }
}

async function mostrarFilmesNaLista(){
    for(let id of listaAssistirMaisTarde){
        try{
            let listaApi = await conectaAPI.mostrarFilmePorId(id)
            
            let listaApiArray = []

            listaApiArray.push(listaApi)

            console.log(listaApiArray)

            listaApiArray.forEach(filme => containerListaFilmes.appendChild(constroiCardFilme(filme.poster_path, filme.title, filme.id)))
        
        }catch{
            containerListaFilmes.innerHTML = '<h1>N FUNFOU</h1>'
        }
    }
}

const botaoFavoritos = document.getElementById('botao-filmes-curtidos')
const botaoLista = document.getElementById('botao-filmes-lista')

botaoFavoritos.addEventListener('click', ()=>{
    botaoFavoritos.style.backgroundColor = 'rgb(89, 89, 89)'
    botaoLista.style.backgroundColor = ''
    containerListaFilmes.innerHTML = ''
    mostrarFilmesFavoritados()
})

botaoLista.addEventListener('click', ()=>{
    botaoFavoritos.style.backgroundColor = ''
    botaoLista.style.backgroundColor = 'rgb(89, 89, 89)'
    containerListaFilmes.innerHTML = ''
    mostrarFilmesNaLista()
})

function pageLoad(){
    mostrarFilmesFavoritados()
    botaoFavoritos.style.backgroundColor = 'rgb(89, 89, 89)'
    if(window.innerWidth <= 588){
        botaoFavoritos.innerHTML = '<i class="fa-solid fa-heart">'
        botaoLista.innerHTML = '<i class="fa-solid fa-list"></i>'
    }else{
        botaoLista.innerHTML = '<h3><i class="fa-solid fa-list"></i> Filmes na sua lista</h3>'
        botaoFavoritos.innerHTML = '<h3><i class="fa-solid fa-heart"></i> Filmes curtidos</h3>'
    }
}


window.addEventListener('resize', ()=> {
    if(window.innerWidth <= 588){
        botaoFavoritos.innerHTML = '<i class="fa-solid fa-heart">'
        botaoLista.innerHTML = '<i class="fa-solid fa-list"></i>'
    }else{
        botaoLista.innerHTML = '<h3><i class="fa-solid fa-list"></i> Filmes na sua lista</h3>'
        botaoFavoritos.innerHTML = '<h3><i class="fa-solid fa-heart"></i> Filmes curtidos</h3>'
    }
})


window.onload = pageLoad()