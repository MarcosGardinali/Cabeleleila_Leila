async function agendamentos() {
  const conexao = await fetch("http://localhost:3000/usuarios");
  const conexaoConvertida = await conexao.json(); //Convertendo os dados em formatos de bytes para um json!

  return conexaoConvertida;
}//Função que cria uma requisição GET para pegar dados de usuários da API


async function criarAgendamento(servico, calendario, horario, id) {
  const idUsuarioLogado = window.idUsuarioLogado;

  // Recupera o objeto de usuário atual do JSON Server, passando o id do usuário logado
  const respostaUsuario = await fetch(`http://localhost:3000/usuarios/${idUsuarioLogado}`);
  if (!respostaUsuario.ok) {
    throw new Error('Usuário não encontrado');
  }

  const usuario = await respostaUsuario.json();


  // Adiciona o novo agendamento ao array "agendamentosUser"
  const novoAgendamento = {
    servico: servico,
    calendario: calendario,
    horario: horario,
    id: Date.now()
  };
  usuario.agendamentosUser.push(novoAgendamento);



  // Envia a atualização do usuário para o JSON Server
  const respostaAtualizacao = await fetch(`http://localhost:3000/usuarios/${idUsuarioLogado}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(usuario)
  });
  if (!respostaAtualizacao.ok) {
    throw new Error('Não foi possível cadastrar o agendamento');
  }

  const conexaoConvertida = await respostaAtualizacao.json();
  return conexaoConvertida;
}


//Cria um novo usuário no JSON Server
async function criarUsuario(nome, senha) {
  const conexao = await fetch("http://localhost:3000/usuarios", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      nome: nome,
      senha: senha,
      agendamentosUser: []
    })
  });
  if (!conexao.ok) {
    throw new Error("Não foi possível cadastrar o usuário!!");
  }

  const conexaoConvertida = await conexao.json();
  return conexaoConvertida;

}


//Valida se o usuário existe no JSON Server e caso exista ele retorna um valor verdadeiro para o login e retorna o usuário, para armazenar o id dele
async function validarUsuario(login, senha) {
  const usuarios = await fetch("http://localhost:3000/usuarios");
  const usuariosConvertidos = await usuarios.json();

  const usuarioEncontrado = usuariosConvertidos.find(
    (usuario) => usuario.nome === login && usuario.senha === senha
  );

  if (usuarioEncontrado) {
    return { valido: true, usuario: usuarioEncontrado }; // Usuário válido
  } else {
    return false; // Usuário inválido
  }
}



//O código busca a lista de usuários no JSON Server, busca o usuário pelo ID de acordo com o usuário logado e atualiza esse usuário removendo o agendamento clicado
async function removerAgendamento(id) {
  try {
    const usuarios = await fetch("http://localhost:3000/usuarios");
    const usuariosConvertidos = await usuarios.json();

    const usuarioEncontrado = usuariosConvertidos.find(
      (usuario) => usuario.id === window.idUsuarioLogado // Substitua 1 pelo ID do usuário logado
    );

    if (usuarioEncontrado) {
      const agendamentoIndex = usuarioEncontrado.agendamentosUser.findIndex(
        (agendamento) => agendamento.id === parseInt(id)
      );

      if (agendamentoIndex !== -1) {
        usuarioEncontrado.agendamentosUser.splice(agendamentoIndex, 1);

        const conexao = await fetch(
          `http://localhost:3000/usuarios/${usuarioEncontrado.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(usuarioEncontrado),
          }
        );

        if (!conexao.ok) {
          throw new Error("Falha ao atualizar o usuário");
        }

        console.log("Agendamento removido com sucesso");
      } else {
        throw new Error("Agendamento não encontrado");
      }
    } else {
      throw new Error("Usuário não encontrado");
    }
  } catch (error) {
    console.error("Erro ao remover agendamento:", error);
    throw error;
  }
}



//Esse código busca os usuários, porém agora ele irá remover os agendamentos do usuário clicado, pois o mesmo está visualizando todos na página
async function removerAgendamentoADM(id, userId) {
  try {
    const usuarios = await fetch("http://localhost:3000/usuarios");
    const usuariosConvertidos = await usuarios.json();

    const usuarioEncontrado = usuariosConvertidos.find(
      (usuario) => usuario.id === userId
    );

    if (usuarioEncontrado) {
      const agendamentoIndex = usuarioEncontrado.agendamentosUser.findIndex(
        (agendamento) => agendamento.id === parseInt(id)
      );

      if (agendamentoIndex !== -1) {
        usuarioEncontrado.agendamentosUser.splice(agendamentoIndex, 1);

        const conexao = await fetch(
          `http://localhost:3000/usuarios/${usuarioEncontrado.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(usuarioEncontrado),
          }
        );

        if (!conexao.ok) {
          throw new Error("Falha ao atualizar o usuário");
        }

        console.log("Agendamento removido com sucesso");
      } else {
        throw new Error("Agendamento não encontrado");
      }
    } else {
      throw new Error("Usuário não encontrado");
    }
  } catch (error) {
    console.error("Erro ao remover agendamento:", error);
    throw error;
  }
}



//Função que recupera o id do usuário logado que está armazenado no JSON Server
async function obterIdUsuarioLogado() {
  const resposta = await fetch('http://localhost:3000/usuarioLogado/1');
  const usuarioLogado = await resposta.json();

  return usuarioLogado.idLogado;
}




//Exportação de todas as funções para serem acessadas de outros arquivos
export const conectaApi = {
  agendamentos,
  criarAgendamento,
  removerAgendamento,
  criarUsuario,
  validarUsuario,
  obterIdUsuarioLogado,
  removerAgendamentoADM
} //O export serve para exportar uma variável chamada conecta API, que recebe os dados da função lista vídeos