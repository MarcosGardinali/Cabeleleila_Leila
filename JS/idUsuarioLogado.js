//Armazena o id do usuário que fica salvo no JSON Server um uma variável global para ser reutilizada

import { conectaApi } from "./conectaApi.js";

window.idUsuarioLogado = await conectaApi.obterIdUsuarioLogado();
console.log(window.idUsuarioLogado);