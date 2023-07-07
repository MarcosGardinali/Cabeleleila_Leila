import { conectaApi } from "./conectaApi.js";

const formulario = document.querySelector("[data-formulario]");


async function criarAgendamento(evento) {
    evento.preventDefault();

    const calendario = document.querySelector("[data-calendario]").value;
    const servico = document.querySelectorAll('input[name="servicos"]:checked');
    const horario = document.querySelector("[data-horario]").value;
    var servicosSelecionados = [];

    servico.forEach(function (checkbox) {
        servicosSelecionados.push(checkbox.value);
    });//Insere no array serviços selecionados os checkbox que estão selecionados

    try {
        const usuarios = await conectaApi.agendamentos(); // Obter todos os usuários e seus agendamentos

        // Verificar se existe algum conflito de agendamento
        const conflito = usuarios.some(usuario =>
            usuario.agendamentosUser.some(agendamento =>
                agendamento.calendario === calendario && agendamento.horario === horario
            )
        );
        

        if (conflito) {
            // Exibir mensagem de erro de conflito de agendamento
            alert("Horário indisponível neste dia! Por favor, escolha outra data/horário.");
        } else {
            await conectaApi.criarAgendamento(servicosSelecionados, calendario, horario);
            window.location.href = "../pages/agendamento-concluido.html";
        }
    } catch (e) {
        console.log(e);
    }
}

formulario.addEventListener("submit", evento => criarAgendamento(evento));