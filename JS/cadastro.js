//Código responsável pelo compotamento de ao clicar no botão de voltar na tela de cadastro, redirecionar para o login

const botaoVoltar = document.querySelector("[data-botao__tela__login]");

botaoVoltar.addEventListener("click", function (evento) {
    evento.preventDefault();
    window.location.href = "../login.html";
});
