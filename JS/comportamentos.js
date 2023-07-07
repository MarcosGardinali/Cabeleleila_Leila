//Arquivo JS responsável por controlar que a data mínima para cadstrar um agendamento não pode ser menor do que a data atual

let dataAtual = new Date();
let ano = dataAtual.getFullYear();
let mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
let dia = String(dataAtual.getDate()).padStart(2, '0');
let dataMinima = ano + '-' + mes + '-' + dia;

document.querySelector('.campo__data').setAttribute('min', dataMinima);