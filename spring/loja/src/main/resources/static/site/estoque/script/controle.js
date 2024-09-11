let produtos = []; // Variável global para armazenar dados dos produtos

// Função para buscar e preencher os dados na tabela
function carregarEstoque() {
    fetch('http://192.168.1.229:8080/estoque')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            produtos = data; // Armazena os dados em uma variável global
            atualizarTabela(data);
        })
        .catch(error => {
            console.error('Erro ao carregar estoque:', error);
        });
}

// Função para atualizar a tabela com os dados recebidos
function atualizarTabela(dados) {
    const tbody = document.getElementById('products-body');
    tbody.innerHTML = ''; // Limpa a tabela existente

    dados.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.produto.nome}</td>
            <td>${item.produto.peso ? item.produto.peso + ' kg' : 'N/A'}</td>
            <td>
                <div class="d-flex align-items-center">
                    <button class="btn btn-secondary btn-sm" onclick="alterarQuantidade(${item.id}, -1)">-</button>
                    <span id="quantidade-${item.id}" class="mx-2">${item.quantidade}</span>
                    <button class="btn btn-secondary btn-sm" onclick="alterarQuantidade(${item.id}, 1)">+</button>
                    <button class="btn btn-primary btn-sm ml-2" onclick="confirmarAlteracao(${item.id})">Confirmar</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Função para alterar a quantidade
function alterarQuantidade(id, delta) {
    const produto = produtos.find(p => p.id === id);
    if (produto) {
        produto.quantidade += delta;
        if (produto.quantidade < 0) produto.quantidade = 0; // Evita quantidade negativa
        document.getElementById(`quantidade-${id}`).textContent = produto.quantidade;
    }
}

// Função para confirmar a alteração
function confirmarAlteracao(id) {
    const produto = produtos.find(p => p.id === id);
    if (produto) {
        // Envia a alteração para o servidor
        makeAjaxRequest(`http://192.168.1.229:8080/estoque/${id}`, 'PUT', produto, criaMsgSucesso, criaMsgErro);
    }
}

// Função de inicialização
$(document).ready(function() {
    carregarEstoque(); // Carrega os dados quando a página for carregada

    $('#search').on('input', function() {
        const query = this.value.toLowerCase();
        const filteredProducts = produtos.filter(p => p.produto.nome.toLowerCase().includes(query));
        atualizarTabela(filteredProducts);
    });
});

function makeAjaxRequest(url, method, data, successCallback, errorCallback) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    // Adiciona o body apenas se a requisição não for GET ou DELETE
    if (method !== 'GET' && method !== 'DELETE') {
        options.body = JSON.stringify(data);
    }

    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição Ajax: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(json => {
            successCallback(json); // Chama a função de sucesso
            return json.id; 
        })
        .catch(error => {
            errorCallback(error); // Chama a função de erro
            throw error; // Propaga o erro
        });
}


function criaMsgSucesso() {
    const mensagemSucesso = document.createElement('div');
    mensagemSucesso.className = 'alert alert-success';
    mensagemSucesso.textContent = 'Tudo Ocorreu Bem.';

    document.getElementById('mensagem').appendChild(mensagemSucesso);
  
    
    // Desaparecer a mensagem de sucesso após 5 segundos
    setTimeout(function() {
        mensagemSucesso.remove();
    }, 5000); // 5000 milissegundos = 5 segundos
}

function criaMsgErro2(erro){
    const mensagemErro = document.createElement('div');
      mensagemErro.className = 'alert alert-danger';
      mensagemErro.textContent = erro.message;
      document.getElementById('mensagem').appendChild(mensagemErro);
}




function criaMsgErro(){
    const mensagemErro = document.createElement('div');
      mensagemErro.className = 'alert alert-danger';
      mensagemErro.textContent = 'Erro ao registrar venda';
      document.getElementById('mensagem').appendChild(mensagemErro);
}