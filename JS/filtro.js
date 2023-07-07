import { conectaApi } from "./conectaApi.js";
import constroiCard from "./controlarAgendamentos.js";

let botaoFiltrar = document.querySelector(".botao__filtrar");
let lista = document.querySelector("[data-lista]");



botaoFiltrar.addEventListener("click", async function (event) {
  event.preventDefault();

  var startDate = document.getElementById("start-date").value;
  var endDate = document.getElementById("end-date").value;

  if (startDate && endDate && startDate > endDate) {
    alert("A data inicial deve ser menor do que a data final.");
    return;
  } else {
    console.log("filtrado");
  }

  try {
    // Obter os agendamentos da API
    const usuarios = await conectaApi.agendamentos();

    // Filtrar os agendamentos com base nas datas selecionadas
    var agendamentosFiltrados = [];
    const idUsuarioLogado = window.idUsuarioLogado;

    usuarios.forEach(function (usuario) {
      if (usuario.id === idUsuarioLogado && usuario.agendamentosUser) {
        usuario.agendamentosUser.forEach(function (agendamento) {
          if (
            agendamento.calendario >= startDate &&
            agendamento.calendario <= endDate
          ) {
            agendamentosFiltrados.push(agendamento);
          }
        });
      }
    });

    // Limpa a lista de agendamentos existente
    while (lista.firstChild) {
      lista.firstChild.remove();
    }

    // Exibe os agendamentos filtrados
    if (agendamentosFiltrados.length > 0) {
      agendamentosFiltrados.forEach(function (agendamento) {
        lista.appendChild(
          constroiCard(
            usuarios[idUsuarioLogado - 1].nome,
            agendamento.servico,
            agendamento.calendario,
            agendamento.horario,
            agendamento.id
          )
        );
      });
    } else {
      lista.innerHTML = '<h2 class="mensagem__agendamentos">Não há agendamentos para exibir</h2>';
    }
  } catch (error) {
    console.error("Erro ao obter os agendamentos:", error);
  }
});