let vendas = [];

// Função para buscar e preencher os dados na tabela de vendas
function carregarVendas(dataInicio, dataFim) {
    fetch(`http://192.168.1.229:8080/venda/between?inicio=${dataInicio}&fim=${dataFim}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            vendas = data;
            somaVendasPeriodo();
            atualizarTabela(data);
        })
        .catch(error => {
            console.error('Erro ao carregar vendas:', error);
        });
}


function cutDecimal(num, decimals) {
    const factor = Math.pow(10, decimals);
    return Math.floor(num * factor) / factor;
}

function somaVendasPeriodo(){
    let soma = 0;
    vendas.forEach(venda=>{
        soma += cutDecimal(venda.valorTotal,2);
    })
    document.getElementById('valorPeriodo').textContent = `R$ ${soma.toFixed(2)}`; 
}

function buscaProdutosVendidos(idVenda) {
    fetch(`http://192.168.1.229:8080/produto-vendido/venda/${idVenda}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            produtos = data;
            abrirModal(data);
        })
        .catch(error => {
            console.error('Erro ao carregar vendas:', error);
        });
}

// Função para atualizar a tabela de vendas
function atualizarTabela(dados) {
    const tbody = document.getElementById('vendas-body');
    tbody.innerHTML = ''; // Limpa a tabela existente

    dados.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${new Date(item.dataVenda).toLocaleDateString()}</td>
            <td>R$ ${item.valorTotal.toFixed(2)}</td>
            <td><button class="btn btn-info" onclick="buscaProdutosVendidos(${item.id})">Ver Produtos</button></td>
        `;
        tbody.appendChild(tr);
    });
}

// Função para abrir o modal e exibir os produtos vendidos
function abrirModal(produtos) {
    const listaProdutos = document.getElementById('produto-vendido-list');
    listaProdutos.innerHTML = ''; // Limpa os itens anteriores

    produtos.forEach(produtoVendido => {
        const li = document.createElement('li');
        li.textContent = `${produtoVendido.produto.nome} - ${produtoVendido.qtd} unidade(s) - R$ ${produtoVendido.preco_unidade.toFixed(2)}`;
        listaProdutos.appendChild(li);
    });

    $('#vendaModal').modal('show'); // Abre o modal
}

document.getElementById('botaoFecha').addEventListener('click',function (){
    $('#vendaModal').modal('toggle'); // Abre o modal
})
document.getElementById('iconFecha').addEventListener('click',function (){
    $('#vendaModal').modal('toggle'); // Abre o modal
})

// Função para capturar a data atual e carregar as vendas de hoje automaticamente
function carregarVendasDeHoje() {
    const hoje = new Date();
    const inicio = new Date(hoje.setHours(0, 0, 0, 0)); // Começo do dia
    const fim = new Date(hoje.setHours(23, 59, 59, 999)); // Fim do dia

    carregarVendas(inicio.toISOString(), fim.toISOString());
}


// Carrega automaticamente as vendas de hoje ao abrir a página
document.addEventListener('DOMContentLoaded', function() {
    carregarVendasDeHoje();
});

// Função para capturar as datas e carregar as vendas entre elas (usada com botão buscar)
document.getElementById('buscar').addEventListener('click', function() {
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;
    
    const inicio = dayjs(dataInicio).startOf('day').toDate(); // Define o início do dia
    const fim = dayjs(dataFim).endOf('day').toDate(); // Define o fim do dia

    if (dataInicio && dataFim) {
        carregarVendas(inicio.toISOString(), fim.toISOString());
    } else {
        alert('Por favor, selecione as datas de início e fim.');
    }
});