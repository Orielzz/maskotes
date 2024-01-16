
// fetch("http://localhost:8080/animal", {
//     method: 'GET',
// })
// .then(response => {
//     if (!response.ok) {
//         throw new Error('Erro ao cadastrar');
//     }
//     return response.json();
// })
// .then(data => {
//     console.log(data)
// })
// .catch(error => {
//     const mensagemErro = document.createElement('div');
//     mensagemErro.className = 'alert alert-danger';
//     mensagemErro.textContent = 'Erro ao buscar animal';

//     document.getElementById('mensagem').appendChild(mensagemErro);
// });

$(document).ready(function() {
    // Configuração do Select2 para o animal com classes personalizadas
    $('#animalSelect').select2({
      ajax: {
        url: 'http://localhost:8080/animal',
        dataType: 'json',
        delay: 250,
        processResults: function(data) {
          return {
            results: data.map(function(animal) {
              return {
                id: animal.id,
                text: animal.nome
              };
            })
          };
        },
        cache: true
      },
      theme: 'bootstrap',
      containerCssClass: 'custom-select2-container', // Adiciona a classe CSS personalizada para o contêiner
      dropdownCssClass: 'custom-select2-dropdown',   // Adiciona a classe CSS personalizada para o menu suspenso
      minimumInputLength: 1  // Define o número mínimo de caracteres para acionar a pesquisa
    });
  });













function insere(){

  fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          // Adicione outros cabeçalhos conforme necessário
      },
      body: JSON.stringify(preparaJson()),
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
      document.getElementById("produtoForm").reset(); // Limpa o formulário
  })
  .catch(error => {
      const mensagemErro = document.createElement('div');
      mensagemErro.className = 'alert alert-danger';
      mensagemErro.textContent = 'Erro ao cadastrar';

      document.getElementById('mensagem').appendChild(mensagemErro);
  });

}
function preparaJson() {
    const json = {};
    
    // Obtém todos os campos do formulário
    const formFields = document.querySelectorAll('#marcaForm input');

    // Itera sobre os campos e adiciona ao JSON
    formFields.forEach(field => {
        const fieldName = field.name;
        const fieldValue = field.value;
        json[fieldName] = fieldValue;
    });

    return json;
}
  
  const url = "http://localhost:8080/produto";
  
  document.getElementById("produtoForm").addEventListener('submit', function (event) {
    event.preventDefault();
    
    // Limpa mensagens anteriores
    document.getElementById('mensagem').innerHTML = '';
  
    const nome = document.querySelector("#nome");
    const porcentagemSaco = document.querySelector("#porcentagemSaco");
    const porcentagemVarejo = document.querySelector("#porcentagemVarejo");
    insere();
   
  });


  