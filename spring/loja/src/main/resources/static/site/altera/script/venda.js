
let vendas = [];



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
            atualizarTabela(vendas);
        })
        .catch(error => {
            console.error('Erro ao carregar vendas:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    const tableElement = document.getElementById('vendas-table');
        table = new DataTable(tableElement, {
        columns: [
            {title: "ID" , data:"id" , visible:false},
            { title: "Data da Venda", data: "dataVenda" },
            { title: "Valor Total", data: "valorTotal" },
            { 
                title: "Ações", 
                data: null, 
                render : function(data,type,row){
                    return criarBotao(row.id);
                }    
            }
        ],
        paging: false,
        searching: true,
        ordering: true,
        info: true,
        lengthChange: true,
        responsive:true
    });
    carregarVendasDeHoje();
});


function criarBotao(idVenda){
    const bt = document.createElement('button');
    bt.classList.add('btn','btn-info' ,'verProdutos');
    
    bt.innerText = 'Ver Produtos';
    
    bt.addEventListener('click', function() {
        buscaProdutosVendidos(idVenda);
    });

    return bt;
}


function validarDatas(dataInicio, dataFim) {
    if (!dataInicio || !dataFim) {
        alert('Por favor, selecione as datas de início e fim.');
        return false;
    }

    const inicio = dayjs(dataInicio).startOf('day').toDate();
    const fim = dayjs(dataFim).endOf('day').toDate();

    if (!dayjs(dataInicio).isValid() || !dayjs(dataFim).isValid()) {
        alert('Por favor, insira datas válidas.');
        return false;
    }

    if (inicio > fim) {
        alert('A data de início não pode ser posterior à data de fim.');
        return false;
    }

    return true;
}



const valorTotal = document.getElementById('valorTotal');
const valorPix = document.getElementById('valorPix');
const valorCredito = document.getElementById('valorCredito');
const valorDebito = document.getElementById('valorDebito');
const valorDinheiro = document.getElementById('valorDinheiro');





function cutDecimal(num, decimals) {
    const factor = Math.pow(10, decimals);
    return Math.floor(num * factor) / factor;
}
const PIX = 4;
const DINHEIRO = 1;
const CREDITO = 2;
const DEBITO = 3;


function somaVendasPeriodo(){
    
    let pix = 0;
    let credito = 0;
    let debito = 0;
    let dinheiro = 0;
    let soma = 0;
    vendas.forEach(venda=>{
      if (venda.pagamento.id == PIX) {
            pix += cutDecimal(venda.valorTotal,2);
      }
      if (venda.pagamento.id == DINHEIRO) {
        dinheiro += cutDecimal(venda.valorTotal,2);
  }
        if (venda.pagamento.id == DEBITO) {
            debito += cutDecimal(venda.valorTotal,2);
        }
        if (venda.pagamento.id == CREDITO) {
            credito += cutDecimal(venda.valorTotal,2);
      }
      
        soma += cutDecimal(venda.valorTotal,2);
    })
    valorCredito.textContent = credito.toFixed(2);
    valorDebito.textContent = debito.toFixed(2);
    valorPix.textContent = pix.toFixed(2);
    valorDinheiro.textContent = dinheiro.toFixed(2);

    


    valorTotal.textContent = `R$ ${soma.toFixed(2)}`; 
}


function name(params) {
    
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


function atualizarTabela(dados) {
    const dadosFormatados = dados.map(venda => ({
        dataVenda: dayjs(venda.dataVenda).format('DD/MM/YYYY HH:mm:ss'), // Formato desejado
        valorTotal: `R$ ${venda.valorTotal.toFixed(2)}`, // Formatação do valor total com prefixo "R$"
        id: venda.id 
        }));


    table.clear().rows.add(dadosFormatados).draw(); // Limpa e adiciona novos dados
}



// Função para abrir o modal e exibir os produtos vendidos
function abrirModal(produtos) {
    const listaProdutos = document.getElementById('produto-vendido-list');
    listaProdutos.innerHTML = ''; 

    produtos.forEach(produtoVendido => {
        const li = document.createElement('li');
        li.textContent = `${produtoVendido.produto.nome} - ${produtoVendido.qtd} unidade(s) - R$ ${produtoVendido.preco_unidade.toFixed(2)}`;
        listaProdutos.appendChild(li);
    });

    $('#vendaModal').modal('show');
}

document.getElementById('botaoFecha').addEventListener('click',function (){
    $('#vendaModal').modal('toggle');
})
document.getElementById('iconFecha').addEventListener('click',function (){
    $('#vendaModal').modal('toggle');
})

// Função para capturar a data atual e carregar as vendas de hoje automaticamente
function carregarVendasDeHoje() {
    const hoje = new Date();
    const inicio = new Date(hoje.setHours(0, 0, 0, 0)); // Começo do dia
    const fim = new Date(hoje.setHours(23, 59, 59, 999)); // Fim do dia

    carregarVendas(inicio.toISOString(), fim.toISOString());
}





// Função para capturar as datas e carregar as vendas entre elas (usada com botão buscar)
document.getElementById('buscar').addEventListener('click', function() {
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;
    
    if (validarDatas(dataInicio, dataFim)) {
        const inicio = dayjs(dataInicio).startOf('day').toDate();
        const fim = dayjs(dataFim).endOf('day').toDate();
        carregarVendas(inicio.toISOString(), fim.toISOString());
    }
});