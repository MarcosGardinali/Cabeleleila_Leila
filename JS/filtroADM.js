import { conectaApi } from "./conectaApi.js";
import constroiCard from "./controlarAgendamentosADM.js";

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
    const usuarios = await conectaApi.agendamentos();

    // Filtrar os agendamentos com base nas datas selecionadas
    const agendamentosFiltrados = [];
    usuarios.forEach((usuario) => {
      usuario.agendamentosUser.forEach((agendamento) => {
        if (
          agendamento.calendario >= startDate &&
          agendamento.calendario <= endDate
        ) {
          // Encontrar o usuário associado ao agendamento atual
          const usuarioAssociado = usuarios.find(
            (u) => u.id === usuario.id
          );
          agendamentosFiltrados.push({
            ...agendamento,
            nomeUsuario: usuarioAssociado.nome, // Adicionar o nome do usuário
            idUsuario: usuario.id,
          });
        }
      });
    });

    // Limpar a lista de agendamentos existente
    while (lista.firstChild) {
      lista.firstChild.remove();
    }

    // Exibir os agendamentos filtrados
    if (agendamentosFiltrados.length > 0) {
      agendamentosFiltrados.forEach((agendamento) => {
        lista.appendChild(
          constroiCard(
            agendamento.nomeUsuario,
            agendamento.servico,
            agendamento.calendario,
            agendamento.horario,
            agendamento.id,
            agendamento.idUsuario // Passar o ID do usuário
          )
        );
      });
    } else {
      lista.innerHTML =
        '<h2 class="mensagem__agendamentos">Não há agendamentos para exibir</h2>';
    }
  } catch (error) {
    console.error("Erro ao obter os agendamentos:", error);
    lista.innerHTML =
      '<h2 class="mensagem__agendamentos">Não foi possível carregar a lista de agendamentos</h2>';
  }
});
