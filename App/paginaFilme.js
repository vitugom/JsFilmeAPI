import { conectaAPI } from "./conectaAPI.js";
import { util } from "./util.js";

const parametro = new URLSearchParams(window.location.search)
const idFilme = parametro.get('id')

const containerInfoFilme = document.querySelector('.infoFilme__container')
const containerSinopse = document.querySelector('.Sinopse__container')
const elencoCardContainer = document.querySelector('.elenco__card-container')
const containerInfoAdicional = document.querySelector('.informacoes-adicionais')
const containerFilmesRecomendados = document.querySelector('.filmes-recomendados__card-container')


function constroiInfoFilme(imagemPoster, imagemFundo, titulo, tagline, data, genero, tempoDeFilme){

  let background = document.querySelector('.infoFilme__container')
  background.style.backgroundImage = "url('https://image.tmdb.org/t/p/original/" + imagemFundo + "')"

  const informacaoFilme = document.createElement('div')
  informacaoFilme.className = 'infoFilmes__conteudo'
  informacaoFilme.innerHTML = 
  `
    <img class="infoFilme__poster-img" src="https://image.tmdb.org/t/p/original/${imagemPoster}" alt="">
    <div class="infos-pricipal-filme">
        <h1 id="filme-titulo">${titulo}</h1>
        <h2 id="filme-tagline">${tagline}</h2>
        <div class="infoFilme__container-botoes">
            <button class="infoFilme__botoes"><i class="fa-solid fa-heart"></i></button>
            <button class="infoFilme__botoes"><i class="fa-solid fa-bookmark"></i></button>
            <button class="infoFilme__botoes"><i class="fa-solid fa-list"></i></button>
            <button id="assister-trailer-botao">Assista o trailer <i class="fa-solid fa-play"></i></button>
        </div>
        <p class="infoFilme__data-genero-duracao">${util.converteDataApiParaFormatoBrasileiro(data)} <i class="fa-solid fa-circle"></i> ${genero} <i class="fa-solid fa-circle"></i> ${util.converterMinutosParaHoras(tempoDeFilme)}</p>
    </div>
  `
  return informacaoFilme
}

function constroiSinopseFilme(sinopse){
  const sinopseFilme = document.createElement('div')
  sinopseFilme.innerHTML = 
  `
  <h1>Sinopse</h1>
  <p>${sinopse}</p>

  `
  return sinopseFilme
}

function constroiCardAtores(imagemUrl, nomeAtor, nomePersonagem, idGenero){

  let imagemUrlCompleta = `https://image.tmdb.org/t/p/original/${imagemUrl}`

  if(imagemUrl == null && idGenero == 2 || imagemUrl == null && idGenero ==0){
    imagemUrlCompleta = './ASSETS/IMG/icone-ator-masc-placeholder.png'
  } else if(imagemUrl == null && idGenero == 1){
    imagemUrlCompleta = './ASSETS/IMG/icone-ator-fem-placeholder.png'
  }


  const cardAtor = document.createElement('div')
  cardAtor.className = 'elenco__card'
  cardAtor.innerHTML = 
  `
    <img src="${imagemUrlCompleta}" alt="">
    <div class="elenco__card-info-ator">
        <h5>${nomeAtor}</h5>
        <p>${nomePersonagem}</p>
    </div>
  `

  return cardAtor
}

function constroiCardInfoAdicional(tituloOriginal, situacao, idiomaOriginal, orcamento, receitaGerada){
  
  let calculoDeLucro = util.calcularLucro(orcamento, receitaGerada)
  
  let porcentagem = ``

  let display = 'block'
  
  if(calculoDeLucro.lucro == NaN || calculoDeLucro.lucro == '' || calculoDeLucro.porcentagem == Infinity || receitaGerada == 0 || receitaGerada == null || orcamento == 0 || orcamento == null){

    display = 'none'
    
  }else if(calculoDeLucro.lucro > 0){
    porcentagem = `<p id="porcentagem" class="porcentagem-lucro"><i style='color: green; font-size:20px; padding-right:5px' class="fa-solid fa-caret-up"></i>${calculoDeLucro.porcentagem}%</p>`
    
  } else{
    porcentagem = `<p id="porcentagem" class="porcentagem-lucro"><i style='color: red; font-size:20px; padding-right:5px' class="fa-solid fa-caret-down"></i>${calculoDeLucro.porcentagem}%</p>`
  }


  const infoAdicional = document.createElement('div')
  infoAdicional.className = 'informacoes-adicionais-container'
  infoAdicional.innerHTML = 
  `
  <div class="info-filme-card">
  <div>
      <h3 class="info-filme-card-titulo">Titulo original</h3>
      <p class="info-filme-card-p">${tituloOriginal}</p>
  </div>
  <div>
      <h3 class="info-filme-card-titulo">Situação</h3>
      <p class="info-filme-card-p">${situacao}</p>
  </div>
  <div>
      <h3 class="info-filme-card-titulo">Idioma original</h3>
      <p class="info-filme-card-p">${idiomaOriginal}</p>
  </div>
</div>
<div class="info-filme-card">
  <div>
      <h3 class="info-filme-card-titulo">Orçamento</h3>
      <p class="info-filme-card-p">${util.formatarNumeroComVirgulas(orcamento)}</p>
  </div>
  <div>
      <h3 class="info-filme-card-titulo">Receita</h3>
      <p class="info-filme-card-p">${util.formatarNumeroComVirgulas(receitaGerada)}</p>
  </div>
  <div style='display: ${display}'>
      <h3 class="info-filme-card-titulo">Lucro</h3>
      <p class="info-filme-card-p">${util.formatarNumeroComVirgulas(calculoDeLucro.lucro)}</p>
      ${porcentagem}
  </div>                
</div>
<div>
  <canvas style='display: ${display}' id="graficoLucro" width="200"></canvas>
</div>
  `
  



  return infoAdicional
}

function criarFilmesRecomendados(imagemUrl, titulo, id){
  const filmesRecomendados = document.createElement('div')
  filmesRecomendados.className = 'filmes-recomendados__card'
  filmesRecomendados.innerHTML = 
  `  
      <img class="filmes-recomendados__card-imagem" src="https://image.tmdb.org/t/p/original/${imagemUrl}" alt="">             
      <p class="filmes-recomendados__card-titulo">${titulo}</p>
  `
  filmesRecomendados.addEventListener('click', () =>{
    window.location.href = `paginaFilme.html?id=${id}`
})


  return filmesRecomendados

}

async function listarDadosDoFilme(){
  try{
    const listaApi = await conectaAPI.mostrarFilmePorId(idFilme)

    let nomeGeneros = listaApi.genres.map((genero) =>{
      return genero.name
    })

    let stringDeGeneros = nomeGeneros.join(", ")
    const listaDeAtores = listaApi.credits.cast;
    const listaDeRecomendacoes = listaApi.recommendations.results
    
    containerInfoFilme.appendChild(constroiInfoFilme(listaApi.poster_path, listaApi.backdrop_path, listaApi.title, listaApi.tagline, listaApi.release_date, stringDeGeneros, listaApi.runtime))

    containerSinopse.appendChild(constroiSinopseFilme(listaApi.overview))

    listaDeAtores.forEach(ator => elencoCardContainer.appendChild(constroiCardAtores(ator.profile_path, ator.name, ator.character, ator.gender)))

    containerInfoAdicional.appendChild(constroiCardInfoAdicional(listaApi.original_title, listaApi.status, listaApi.original_language, listaApi.budget, listaApi.revenue))
    
    // configuracoes do grafico
    let calculoDeLucro = util.calcularLucro(listaApi.budget, listaApi.revenue)

    const data = {
      labels: ['Receita', 'Custos', 'Lucro'],
      datasets: [{
        label: 'Dados do Filme',
        data: [listaApi.revenue, listaApi.budget, calculoDeLucro.lucro],
        backgroundColor: [
          'rgba(255, 99, 132, 1)', 
          'rgba(54, 162, 235, 1)',  
          'rgba(255, 206, 86, 1)'   
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth:1
      }]
    };
    const config = {
      type: 'doughnut',
      data: data,
    };
  const graficoLucro = new Chart(
      document.getElementById('graficoLucro'),
      config
    );
//---------------------------------------------------

    listaDeRecomendacoes.forEach(filme => containerFilmesRecomendados.appendChild(criarFilmesRecomendados(filme.poster_path, filme.title, filme.id)))
  }catch{
    
  }
}

listarDadosDoFilme()














