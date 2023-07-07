//Arquivo responsável por pegar os valores do campo nome e senha da tela de cadastro e passar como parâmetro na chamada da função criarUsuario do arquivo importado conectaAPI

import { conectaApi } from "./conectaApi.js";

const formulario = document.querySelector(".formulario");

async function criarUsuario(evento) {
    evento.preventDefault();

    const nome = document.querySelector("[data-campo__nome]").value;
    const senha = document.querySelector("[data-campo__senha]").value;
    try {
        await conectaApi.criarUsuario(nome, senha);
        window.location.href = "../login.html";
    } catch (e) {
        console.log(e);
    }
}

formulario.addEventListener("submit", evento => criarUsuario(evento));