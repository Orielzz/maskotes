// Função para fazer uma requisição Ajax genérica
function makeAjaxRequest(url, method, data, successCallback, errorCallback) {
  fetch(url, {
      method: method,
      headers: {
          'Content-Type': 'application/json',
          // Adicione outros cabeçalhos conforme necessário
      },
      body: JSON.stringify(data),
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Erro na requisição Ajax');
      }
      return response.json();
  })
  .then(successCallback)
  .catch(errorCallback);
}

// Função para configurar e inicializar um Select2
function initializeSelect2(selector, url, textField, minimumInputLength) {
  $(document).ready(function() {
      $(selector).select2({
          ajax: {
              url: function (params) {
                  return params.term ? `${url}/nome/${encodeURIComponent(params.term)}` : url;
              },
              dataType: 'json',
              delay: 250,
              processResults: function(data) {
                  return {
                      results: data.map(function(item) {
                          return {
                              id: item.id,
                              text: item[textField]
                          };
                      })
                  };
              },
              cache: true,
              error: function(jqXHR, textStatus, errorThrown) {
                  console.error('Falha na solicitação Ajax:', textStatus, errorThrown);
              }
          },
          containerCssClass: 'custom-select2-container',
          dropdownCssClass: 'custom-select2-dropdown',
          minimumInputLength: minimumInputLength
      });
  });
}

// Função para tratar o envio do formulário
function handleFormSubmission(event) {
  event.preventDefault();
  document.getElementById('mensagem').innerHTML = ''; // Limpa mensagens anteriores
  insere();
}


// Função para preparar o JSON com base nos campos do formulário
function prepareJson() {
  const nome = document.getElementById("nome").value;
  const preco_custo = document.getElementById("preco_custo").value;
  const porcentagem_saco = document.getElementById("porcentagem_saco").value;
  const porcentagem_varejo = document.getElementById("porcentagem_varejo").value;
  const sabor = document.getElementById("sabor").value;
  const peso = document.getElementById("peso").value;
  const preco_saco = document.getElementById("preco_saco").value;
  const preco_quilo = document.getElementById("preco_quilo").value;
  const idAnimal = document.getElementById("animalSelect").value;
  const idFornecedor = document.getElementById("fornecedorSelect").value;
  const idIdade = document.getElementById("idadeSelect").value;
  const idPorte = document.getElementById("porteSelect").value;
  const idMarca = document.getElementById("marcaSelect").value;
  const idTipoProduto = document.getElementById("tipoProdutoSelect").value;
  const codigoBarras = document.getElementById("codigoBarras").value;
  const json = {
    "nome": nome,
    "porcentagem_varejo": porcentagem_varejo,
    "porcentagem_saco": porcentagem_saco,
    "codigoBarras": codigoBarras,
    "preco_custo": preco_custo,
    "preco_quilo": preco_quilo,
    "preco_saco": preco_saco,
    "sabor": sabor,
    "peso":peso,
    "tipoProduto": {
        "id": idTipoProduto
    },
    "marca": {
        "id": idMarca
    },
    "animal": {
        "id": idAnimal
    },
    "fornecedor": {
        "id": idFornecedor
    },
    "idade": {
        "id": idIdade
    },
    "porte": {
        "id": idPorte
    }
   
}

  return json;
}

/***
 * 
 * @return if a object its empty or not
 * 
 */
function isEmpty(object){
   array.forEach(element => {
    
   });
    return true;
}

// Função para inserir um novo registro
function insere() {
    // const barras = document.getElementById('codigoBarras').value;
    // console.log(barras);
    // const uri =  "http://192.168.1.229:8080/produto/codigo/"+barras;
    // fetch(uri, {
    //     method: "GET",
    //     headers: {
    //         'Content-Type': 'application/json',
    //         // Adicione outros cabeçalhos conforme necessário
    //     },
        
    // })
    // .then(response => {
    //     if (!response.ok) {
    //         throw new Error('Erro na requisição Ajax');
    //     }
    //     if(isEmpty(response.json())){
    //         throw new Error('Erro');
    //     }
    //     console.log(response.json());
    // })
    // .catch(error=>{
    //     console.log(error)
    //     const mensagemErro = document.createElement('div');
    //   mensagemErro.className = 'alert alert-danger';
    //   mensagemErro.textContent = 'Codigo de Barras já cadastrado';

    //   document.getElementById('mensagem').appendChild(mensagemErro);
    // });


  const url = "http://192.168.1.229:8080/produto";
  const data = prepareJson('#produtoForm');

  makeAjaxRequest(url, 'POST', data, function(data) {
      const mensagemSucesso = document.createElement('div');
      mensagemSucesso.className = 'alert alert-success';
      mensagemSucesso.textContent = 'Cadastro realizado com sucesso!';

      document.getElementById('mensagem').appendChild(mensagemSucesso);
      document.getElementById("produtoForm").reset(); // Limpa o formulário
  }, function(error) {
      const mensagemErro = document.createElement('div');
      mensagemErro.className = 'alert alert-danger';
      mensagemErro.textContent = 'Erro ao cadastrar';

      document.getElementById('mensagem').appendChild(mensagemErro);
  });
}

// Configurações para Select2 para cada campo
initializeSelect2('#animalSelect', 'http://192.168.1.229:8080/animal', 'nome', 0);
initializeSelect2('#fornecedorSelect', 'http://192.168.1.229:8080/fornecedor', 'nome', 0);
initializeSelect2('#idadeSelect', 'http://192.168.1.229:8080/idade', 'descricao', 0);
initializeSelect2('#marcaSelect', 'http://192.168.1.229:8080/marca', 'nome', 0);
initializeSelect2('#porteSelect', 'http://192.168.1.229:8080/porte', 'descricao', 0);
initializeSelect2('#tipoProdutoSelect', 'http://192.168.1.229:8080/tipo-produto', 'descricao', 0);

// Adiciona o ouvinte de evento para o formulário
document.getElementById("produtoForm").addEventListener('submit', handleFormSubmission);


function calcularPrecosComPorcentagem() {
  const precoCusto = parseFloat(document.getElementById('preco_custo').value) || 0;
  const porcentagemSaco = parseFloat(document.getElementById('porcentagem_saco').value) || 0;
  const porcentagemVarejo = parseFloat(document.getElementById('porcentagem_varejo').value) || 0;
  const peso = parseFloat(document.getElementById('peso').value) || 0;

  const precoSaco = precoCusto * (1 + porcentagemSaco / 100);
  const precoQuilo = (precoCusto * (1 + porcentagemVarejo / 100))/peso;
  

  document.getElementById('preco_saco').value = precoSaco.toFixed(2);
  document.getElementById('preco_quilo').value = precoQuilo.toFixed(2);
}

function calcularPorcentagemComPrecos() {
  const precoCusto = parseFloat(document.getElementById('preco_custo').value) || 0;
  const precoSaco = parseFloat(document.getElementById('preco_saco').value) || 0;
  const precoQuilo = parseFloat(document.getElementById('preco_quilo').value) || 0;
  const peso = parseFloat(document.getElementById('peso').value) || 0;

  const porcentagemSaco = ((precoSaco / precoCusto) - 1) * 100;
  const porcentagemVarejo = (((precoQuilo *peso) / precoCusto) - 1) * 100;

  document.getElementById('porcentagem_saco').value = porcentagemSaco.toFixed(0);
  document.getElementById('porcentagem_varejo').value = porcentagemVarejo.toFixed(0);
}

document.getElementById('preco_custo').addEventListener('change', calcularPrecosComPorcentagem);
document.getElementById('porcentagem_saco').addEventListener('change', calcularPrecosComPorcentagem);
document.getElementById('porcentagem_varejo').addEventListener('change', calcularPrecosComPorcentagem);
document.getElementById('peso').addEventListener('change', calcularPrecosComPorcentagem);

document.getElementById('preco_saco').addEventListener('change', calcularPorcentagemComPrecos);
document.getElementById('preco_quilo').addEventListener('change', calcularPorcentagemComPrecos);
document.getElementById('peso').addEventListener('change', calcularPorcentagemComPrecos);

