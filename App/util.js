function converteDataApiParaFormatoBrasileiro(data){
    let dataDivisao = data.split('-')
    let ano = dataDivisao[0]
    let mes = dataDivisao[1]
    let dia = dataDivisao[2]

    let dataBr = dia + '/' + mes + '/' + ano
    return dataBr
}

function converterMinutosParaHoras(minutos){
    let horas = Math.floor(minutos / 60)
    let minutosRestantes = minutos % 60
    if(minutos >= 60){
        return horas + 'h' + minutosRestantes + 'm'
    }
    return minutosRestantes + 'm'
}

function calcularLucro(orcamento, receita){
    let lucro = receita - orcamento
    let porcentagemLucro = (lucro / orcamento) * 100
    return {
        lucro: lucro,
        porcentagem: porcentagemLucro
    }
}




export const util = {
    converteDataApiParaFormatoBrasileiro,
    converterMinutosParaHoras,
    calcularLucro
}