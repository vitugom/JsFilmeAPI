const apiKey = "bffecc0836137a11f7813f5c57f0b933"

const generos = ['10752', '28', '35']

async function mostraFilmesPopulares(){
    const conexao = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc&api_key=${apiKey}`)
    const conexaoConvertida = await conexao.json()
    return conexaoConvertida.results
}

async function buscarFilme(pesquisa){
    const conexao = await fetch(`https://api.themoviedb.org/3/search/movie?query=${pesquisa}&include_adult=false&language=pt-BR&page=1&api_key=${apiKey}`)
    const conexaoConvertida = await conexao.json()
    return conexaoConvertida.results
}

async function buscarListaDeGenero(){
    const conexao = await fetch(`https://api.themoviedb.org/3/genre/movie/list?language=pt-BR&api_key=${apiKey}`)
    const conexaoConvertida = await conexao.json()
    return conexaoConvertida
}

let arrayGeneros = Object.values(await buscarListaDeGenero())

function encontrarNomeGeneroPorId(id){
    let genero = arrayGeneros[0].find((item) =>{
        return item.id === id
    })
    return genero ? genero.name : null
}



async function buscarFilmePorGenero(pagina,id){
    const conexao = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=${pagina}&api_key=${apiKey}&sort_by=popularity.desc&with_genres=${id}`)
    const conexaoConvertida = await conexao.json()
    return conexaoConvertida
}

async function mostrarFilmePorId(id){
    const conexao = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR&append_to_response=videos,credits,recommendations,images&include_image_language=en,null`)
    const conexaoConvertida = await conexao.json()
    return conexaoConvertida
}



export const conectaAPI = {
    mostraFilmesPopulares,
    buscarFilme,
    buscarListaDeGenero,
    encontrarNomeGeneroPorId,
    buscarFilmePorGenero,
    mostrarFilmePorId
}