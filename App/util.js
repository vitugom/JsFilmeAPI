function converteDataApiParaFormatoBrasileiro(data){
    let dataDivisao = data.split('-')
    let ano = dataDivisao[0]
    let mes = dataDivisao[1]
    let dia = dataDivisao[2]

    let dataBr = dia + '/' + mes + '/' + ano
    return dataBr
}


export const util = {
    converteDataApiParaFormatoBrasileiro
}