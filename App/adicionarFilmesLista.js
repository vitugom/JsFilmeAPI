function adicionarAosFavoritos(id){
if (typeof(Storage) !== "undefined") {
  
  var listaFilmesFavoritos = JSON.parse(localStorage.getItem("filmesFavoritos")) || [];
  
  var index = listaFilmesFavoritos.indexOf(id);
  if (index === -1) {

    listaFilmesFavoritos.push(id);
  } else {

    listaFilmesFavoritos.splice(index, 1);
  }

  localStorage.setItem("filmesFavoritos", JSON.stringify(listaFilmesFavoritos));

} else {
  console.error("Desculpe, o seu navegador não suporta localStorage.");
}
}

function adicionarAssistirMaisTarde(id){
  if (typeof(Storage) !== "undefined") {
    
    var listaAssistirMaisTarde = JSON.parse(localStorage.getItem("AssistirMaisTarde")) || [];
    
    var index = listaAssistirMaisTarde.indexOf(id);
    if (index === -1) {
  
      listaAssistirMaisTarde.push(id);
    } else {
  
      listaAssistirMaisTarde.splice(index, 1);
    }
  
    localStorage.setItem("AssistirMaisTarde", JSON.stringify(listaAssistirMaisTarde));
  
  } else {
    console.error("Desculpe, o seu navegador não suporta localStorage.");
  }
  }



export const addFilmesListas = {
    adicionarAosFavoritos,
    adicionarAssistirMaisTarde
} 