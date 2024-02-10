import { conectaAPI } from "./conectaAPI.js"

const parametro = new URLSearchParams(window.location.search)
let buscaIdUrl = parametro.get('categId')
let idGenero = parseInt(buscaIdUrl)
let page = 1;

const tituloPagina = document.querySelector(".titulo-popular")
tituloPagina.innerHTML = conectaAPI.encontrarNomeGeneroPorId(idGenero)

const containerFilmesPorGenero = document.querySelector('.carrousel')

function carregarMais(){
    page++
    listarFilmesPorGenero(page, idGenero)
}

const botaoCarregarMais = document.querySelector(".botao-carregar-mais")

botaoCarregarMais.addEventListener('click', () => {
    carregarMais(page)
})


function constroiCardFilmeGenero(urlImagem, titulo, id){
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


async function listarFilmesPorGenero(NumPagina, genero){
    try{
        const listaAPI = await conectaAPI.buscarFilmePorGenero(NumPagina, genero)
        listaAPI.results.forEach(elemento => containerFilmesPorGenero.appendChild(constroiCardFilmeGenero(elemento.poster_path, elemento.title, elemento.id)))
        let totalPaginas = listaAPI.total_pages
        console.log(totalPaginas)
    }catch {
        containerFilmesPorGenero.innerHTML = `<h2>Não foi possível carregar a lista de filmes</h2>`
    }
}

listarFilmesPorGenero(page, idGenero)

