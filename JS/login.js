import { conectaApi } from "./conectaApi.js";

const botaoLogin = document.querySelector("[data-botao__login]");
const botaoCadastro = document.querySelector("[data-botao__cadastro]");


botaoLogin.addEventListener("click", evento => login(evento));
botaoCadastro.addEventListener("click", function (evento) {
  evento.preventDefault();
  window.location.href = "../pages/cadastro.html";
});



async function login(event) {
  event.preventDefault();

  const campoLogin = document.querySelector("[data-campo__login]").value;
  const campoSenha = document.querySelector("[data-campo__senha]").value;

  if (campoLogin == "admin" && campoSenha == "admin") {
    window.location.href = "../pages/indexADM.html";
  } else

    try {
      const resultadoValidacao = await conectaApi.validarUsuario(campoLogin, campoSenha);

      if (resultadoValidacao.valido) {
        const usuarioValido = resultadoValidacao.usuario; // Obtém o objeto do usuário logado
        const idUsuarioLogado = usuarioValido.id;
        await fetch('http://localhost:3000/usuarioLogado/1', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idLogado: idUsuarioLogado
          })
        });



        window.location.href = "../pages/index.html"; // Redirecionar para a página desejada após o login válido
      } else {
        alert("Login ou Senha inválidos!!!");
      }
    } catch (e) {
      console.log(e);
    }
}