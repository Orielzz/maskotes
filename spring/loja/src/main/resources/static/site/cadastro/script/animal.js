function preparaJson(nomeAnimal) {
  const json = {
      nome: nomeAnimal
  }

  return json;
}

const url = "http://localhost:8080/animal";

document.getElementById("animalForm").addEventListener('submit', function (event) {
  event.preventDefault();
  
  // Limpa mensagens anteriores
  document.getElementById('mensagem').innerHTML = '';

  const nome = document.querySelector("#nome");
  const texto = nome.value;

  fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          // Adicione outros cabeçalhos conforme necessário
      },
      body: JSON.stringify(preparaJson(texto)),
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Erro ao cadastrar');
      }
      return response.json();
  })
  .then(data => {
      const mensagemSucesso = document.createElement('div');
      mensagemSucesso.className = 'alert alert-success';
      mensagemSucesso.textContent = 'Cadastro realizado com sucesso!';

      document.getElementById('mensagem').appendChild(mensagemSucesso);
      document.getElementById("animalForm").reset(); // Limpa o formulário
  })
  .catch(error => {
      const mensagemErro = document.createElement('div');
      mensagemErro.className = 'alert alert-danger';
      mensagemErro.textContent = 'Erro ao cadastrar';

      document.getElementById('mensagem').appendChild(mensagemErro);
  });
});
