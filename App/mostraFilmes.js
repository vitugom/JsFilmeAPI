import { conectaAPI } from "./conectaAPI.js";

const containerFilmesPopulares = document.querySelector(".carrousel")

function constroiCardFilme(urlImagem, titulo, id){
    const filme = document.createElement("div")
    filme.className = "carrousel__card"
    filme.innerHTML = `
        <img class="card__imagem-filme" src="https://image.tmdb.org/t/p/original/${urlImagem}" alt="">
        <div class="card__conteudo">
            <h3 class="card__titulo-filme">${titulo}</h3>
            <div class="carrousel__card-opcoes">
                <a href="paginaFilme.html?id=${id}" class="carrousel__card-btn-ver-mais">Ver mais</a>
                <a href=""><i class="fa-solid fa-heart"></i></a>
                <a href=""><i class="fa-solid fa-circle-plus"></i></a>
            </div>
        </div>        
    `
    return filme;
}


async function listarFilmes(){
    try{
        const listaApi = await conectaAPI.mostraFilmesPopulares();
        listaApi.forEach(elemento => containerFilmesPopulares.appendChild(constroiCardFilme(elemento.poster_path, elemento.title, elemento.id)))
    } catch {
        containerFilmesPopulares.innerHTML = `<h2>Não foi possível carregar a lista de filmes</h2>`
    }
}

listarFilmes()

