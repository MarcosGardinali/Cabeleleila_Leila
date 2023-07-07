import { conectaApi } from "./conectaApi.js";


document.addEventListener('DOMContentLoaded', function () {
  // Código para exibir os agendamentos aqui
});

const lista = document.querySelector("[data-lista]");


//Essa função cé responsável por criar e retornar um elemento <li> que representa um card de agendamento.
export default function constroiCard(nome, servico, calendario, horario, id) {
  const calendarioConvertido = calendario.split('-');
  const dataCorreta = calendarioConvertido.reverse().join('/')//Converte a data para o formato dia/mes/ano
  
  const agendamento = document.createElement("li");
  agendamento.classList = "lista__agendamentos";
  agendamento.innerHTML = `<div class="container__agendamentos">
      <h3>Nome: ${nome}</h3>
      <p>Serviços: ${servico}</p>
      <p>Data: ${dataCorreta}</p>
      <p>Hora: ${horario}</p>
      <buttom class="botao__excluir__agendamento" data-id="${id}">Excluir agendamento</buttom>

  </div>`;

  const botaoExcluir = agendamento.querySelector('.botao__excluir__agendamento');//Criação da constante do elemento botão excluir

  botaoExcluir.addEventListener('click', (event) => {
    const id = event.target.dataset.id;
    conectaApi.removerAgendamento(id)
      .then(() => {
        agendamento.remove();
        console.log('Agendamento removido com sucesso');
      })
      .catch((error) => {
        console.error('Erro ao remover agendamento:', error);
      });
  });//Bloco que escuta o evento de click do botão e passa o id do agendamento que foi excluido para o arquivo conectaAPI o remove do db.json, além de remover o elemento do DOM

  return agendamento;
}



// Essa coleta e percorre os dados da API, fazendo com que cada elemento retornado seja colocado como filho da lista
async function agendamentos() {
  try {
    const listaApi = await conectaApi.agendamentos();
    const idUsuarioLogado = window.idUsuarioLogado; // Substitua 1 pelo ID do usuário logado
    const usuarioLogado = listaApi.find(
      (usuario) => usuario.id === idUsuarioLogado
    );


    if (usuarioLogado && usuarioLogado.agendamentosUser.length > 0) {
      usuarioLogado.agendamentosUser.forEach((agendamento) =>
        lista.appendChild(
          constroiCard(
            usuarioLogado.nome,
            agendamento.servico,
            agendamento.calendario,
            agendamento.horario,
            agendamento.id
          )
        )
      );
    } else {
      lista.innerHTML = `<h2 class="mensagem__agendamentos">Não há agendamentos para exibir</h2>`;
    }
  }
  catch {
    lista.innerHTML = `<h2 class="mensagem__agendamentos">Não foi possível carregar a lista de agendamentos</h2>`
  }
}

document.addEventListener('DOMContentLoaded', function () {
  agendamentos();
});


