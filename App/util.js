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
    let porcentagemLucro = ((lucro / orcamento) * 100).toFixed(2)
    porcentagemLucro - parseFloat(porcentagemLucro).toString()
    return {
        lucro: lucro,
        porcentagem: porcentagemLucro
    }
}

function formatarNumeroComVirgulas(numero){
    let stringNumero = numero.toString()

    let partes = stringNumero.split('.')
    let parteInteira = partes[0]
    let parteDecimal = partes.lenght > 1 ? '.' + partes[1] : ''

    parteInteira = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    if(numero == 0 || numero =="" || numero == NaN){
        return "-"
    }
    return '$' + parteInteira + parteDecimal;
}






export const util = {
    converteDataApiParaFormatoBrasileiro,
    converterMinutosParaHoras,
    calcularLucro,
    formatarNumeroComVirgulas
}