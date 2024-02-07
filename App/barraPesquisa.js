import { conectaAPI } from "./conectaAPI.js";
import { util } from "./util.js";

const barraDePesquisa = document.getElementById('pesquisar')
const containerResultadoPesquisa = document.querySelector('.pesquisar__container-resultado')

function constroiCardPesquisa(urlImagem, titulo, data, filmeGenero, id){

    let spanString = ''

    filmeGenero.forEach(item => {
        spanString += `<span class="pesquisar__filme-categ">${conectaAPI.encontrarNomeGeneroPorId(item)}</span>`
    })

    const filme = document.createElement("div")
    filme.className = "pesquisar__resultado-card"
    filme.innerHTML = `
        <div class="pesquisar__resultado-card-info-filme">
            <img class="pesquisar__img" src="https://image.tmdb.org/t/p/original/${urlImagem}" alt="">
            <div class="pesquisar__titulo-data-lancamento">
                <h3 class="pesquisar__titulo">${titulo}</h3>
                <p class="pesquisar__data-lancamento">${util.converteDataApiParaFormatoBrasileiro(data)}</p>
            </div>
        </div>
        <div class="pesquisar__resultado-card-categorias">
            ${spanString}
        </div>
            <hr class="menu__barra">
    `
    filme.addEventListener('click', () =>{
        window.location.href = `paginaFilme.html?id=${id}`
    })


    return filme;
}

async function listarPesquisa(){
    try{
        const listaApi = await conectaAPI.buscarFilme(barraDePesquisa.value)
        listaApi.forEach(elemento => {
            containerResultadoPesquisa.appendChild(constroiCardPesquisa(elemento.poster_path, elemento.title, elemento.release_date, elemento.genre_ids, elemento.id))
        })
    } catch{
        containerResultadoPesquisa.innerHTML = `<h2>Erro ao conectar com API</h2>`
    }
}


// barraDePesquisa.addEventListener('blur', () => {
//     containerResultadoPesquisa.style.display = 'none'
// })

barraDePesquisa.addEventListener('focus', () => {
    if(barraDePesquisa.value.trim() !== ''){
        containerResultadoPesquisa.style.display = 'block'
    } else {
        containerResultadoPesquisa.style.display = 'none'
    }
})

barraDePesquisa.addEventListener('input', () =>{
    if(barraDePesquisa.value.trim() === ''){
        containerResultadoPesquisa.style.display = 'none'
    } else{
        containerResultadoPesquisa.style.display = 'block'
        containerResultadoPesquisa.innerHTML = ''
        listarPesquisa()
    }
})

