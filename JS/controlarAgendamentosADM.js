import { conectaApi } from "../JS/conectaApi.js";

const lista = document.querySelector("[data-lista]");


////Essa função cé responsável por criar e retornar um elemento <li> que representa um card de agendamento.
export default function constroiCard(nome, servico, calendario, horario, id, userId) {
  const calendarioConvertido = calendario.split('-');
  const dataCorreta = calendarioConvertido.reverse().join('/')//Converte a data para o formato dia/mes/ano
  
  const agendamento = document.createElement("li");
  agendamento.classList = "lista__agendamentos";
  agendamento.innerHTML = `<div class="container__agendamentos">
    <h3>Nome: ${nome}</h3>
    <p>Serviços: ${servico}</p>
    <p>Data: ${dataCorreta}</p>
    <p>Hora: ${horario}</p>
    <buttom class="botao__excluir__agendamento">Excluir agendamento</buttom>
</div>`;

  const botaoExcluir = agendamento.querySelector('.botao__excluir__agendamento');//Criação da constante do elemento botão excluir

  botaoExcluir.addEventListener('click', () => {
    conectaApi.removerAgendamentoADM(id, userId)//Chama a função remove API, passando id que recebe como parâmetro na construção do card para identificar quem foi removido
      .then(() => {
        agendamento.remove(); // Remove o card do agendamento do DOM
        console.log('Agendamento removido com sucesso');
      })
      .catch((error) => {
        console.error('Erro ao remover agendamento:', error);
      });
  });//Bloco que escuta o evento de click do botão e passa o id do agendamento que foi excluido para o arquivo conectaAPI o remove do db.json, além de remover o elemento do DOM

  return agendamento;
}

// Essa coleta e percorre os dados da API, fazendo com que cada elemento retornado seja colocado como filho da lista
async function exibirTodosAgendamentos() {
  try {
    const listaApi = await conectaApi.agendamentos();

    if (listaApi.length > 0) {
      listaApi.forEach((usuario) => {
        usuario.agendamentosUser.forEach((agendamento) =>
          lista.appendChild(
            constroiCard(
              usuario.nome,
              agendamento.servico,
              agendamento.calendario,
              agendamento.horario,
              agendamento.id,
              usuario.id
            )
          )
        );
      });
    } else {
      lista.innerHTML = `<h2 class="mensagem__agendamentos">Não há agendamentos para exibir</h2>`;
    }
  } catch {
    lista.innerHTML = `<h2 class="mensagem__agendamentos">Não foi possível carregar a lista de agendamentos</h2>`;
  }
}

exibirTodosAgendamentos();