document.addEventListener('DOMContentLoaded', function() {
    // Inicializar o Select2
    const url = "http://192.168.1.229:8080/produto";

    initializeSelect2("#productSearch", url, "nome", "sabor", "porte", 0);

    const form = document.getElementById("addSaleForm");
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar o envio automático do formulário
    });

    const barcodeSearch = document.getElementById('barcodeSearch');

    // Ouvir o evento input no campo de código de barras
    barcodeSearch.addEventListener('change', function() {
        const barcode = barcodeSearch.value;
        if (barcode) {
            buscaProdutoCodigo(barcode)
                .then(produto => {
                    const product = {
                        id: produto.id,
                        name: produto.nome,
                        price: produto.preco_saco
                    };

                    if (product) {
                        adicionarProduto(product);
                        
                    }
                    barcodeSearch.value = '';
                })
                .catch(error => {
                    console.error(`Erro durante a solicitação: ${error.message}`);
                });
        }
    });




        
    document.getElementById('addProductBtn').addEventListener('click', addProduct);
    document.getElementById("finalizarBtn").addEventListener('click',function(event){
        event.preventDefault();
        const pagamento = document.getElementById('paymentType').value
        const vendaJSON = criaVendaJson(dataAtual,pagamento);
        criaVenda(vendaJSON).then(idVenda=>{
            const lista = criaProdutosVendidosJSON(idVenda);
            insereProdutosVendidos(lista);
            limparCarrinho(); // Limpar o carrinho após criar os produtos em JSON
        }).catch(error => {
            console.error(`Erro durante a solicitação da venda sla: ${error.message}`);
        });


    })

   
 

});
const dataAtual = new Date().toISOString().slice(0,10);

function criaProdutosVendidosJSON(idVenda){
    let produtosJSON=[];
    produtos.forEach(product => {
        
        const subValor = product.price * product.quantidade;
        const json = {
            'preco_unidade' : product.price,
            'qtd' : product.quantidade,
            "valor_total":subValor,
            "produto" : {'id': product.id},
            "venda": {'id':idVenda}

        }
        produtosJSON.push(json);
    });
   return produtosJSON;
}

function insereProdutosVendidos(lista){
    lista.forEach(produtoVendido=>{
        makeAjaxRequest("http://192.168.1.229:8080/produto-vendido","POST",produtoVendido,criaMsgSucesso2,criaMsgErro2)

        })

}





function criaVenda(vendaJSON) {
    return makeAjaxRequest(
        "http://192.168.1.229:8080/venda",
        "POST",
        vendaJSON,
        criaMsgSucesso, // Passando a referência da função, não a chamada da função
        criaMsgErro // Passando a referência da função, não a chamada da função
    ).then(id => {
        return id;
    }).catch(error => {
        console.error('Erro ao criar venda:', error);
        throw error; // Propagar o erro para que possa ser tratado em outro lugar, se necessário
    });
}


function criaMsgSucesso() {
    const mensagemSucesso = document.createElement('div');
    mensagemSucesso.className = 'alert alert-success';
    mensagemSucesso.textContent = 'Venda registrada com sucesso!';

    document.getElementById('mensagem').appendChild(mensagemSucesso);
    document.getElementById("addSaleForm").reset();
    
  
    
    renderizarProdutos();
    
    // Desaparecer a mensagem de sucesso após 5 segundos
    setTimeout(function() {
        mensagemSucesso.remove();
    }, 5000); // 5000 milissegundos = 5 segundos
}

function criaMsgSucesso2() {
   
}function criaMsgErro2(){
    const mensagemErro = document.createElement('div');
      mensagemErro.className = 'alert alert-danger';
      mensagemErro.textContent = 'Erro ao registrar ProdutoVendido';
      document.getElementById('mensagem').appendChild(mensagemErro);
}




function criaMsgErro(){
    const mensagemErro = document.createElement('div');
      mensagemErro.className = 'alert alert-danger';
      mensagemErro.textContent = 'Erro ao registrar venda';
      document.getElementById('mensagem').appendChild(mensagemErro);
}




function criaVendaJson(data,pagamento){
    
    
   
    const venda = 
        {
            "valorTotal": calcularValorTotalVenda(),
            "dataVenda": data,
            "pagamento": {
                "id": pagamento
            }
        }
        return venda;
}

function limparCarrinho() {
    produtos = [];
    renderizarProdutos();
}

function makeAjaxRequest(url, method, data, successCallback, errorCallback) {
    return fetch(url, {
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
        return response.json(); // Converte a resposta para JSON
    })
    .then(json => {
        successCallback(json); // Chama a função de retorno de sucesso e passa os dados JSON
        return json.id; // Retorna o id da venda
    })
    .catch(error => {
        errorCallback(error); // Chama a função de retorno de erro se ocorrer algum erro
        throw error; // Propaga o erro para que possa ser tratado em outro lugar, se necessário
    });
}





function initializeSelect2(selector, url, textField, flavorField, porteField, minimumInputLength) {
    $(document).ready(function() {
        $(selector).select2({
            ajax: {
                url: function(params) {
                    return params.term ? `${url}/nome/${encodeURIComponent(params.term)}` : url;
                },
                dataType: 'json',
                delay: 250,
                processResults: function(data) {
                    return {
                        results: data.map(function(item) {
                            return {
                                id: item.id,
                                text: `${item[textField]} - ${item[flavorField]} - ${item[porteField].descricao}`
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

function calcularValorTotalVenda() {
    let valorTotalVenda = 0;
    produtos.forEach(product => {
        valorTotalVenda += product.price * product.quantidade;
    });
    return valorTotalVenda.toFixed(2); // Arredondando para duas casas decimais
}



let produtos = [];

function adicionarProduto(product) {
    const produtoExistente = produtos.find(p => p.id === product.id);
    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        product.quantidade = 1;
        produtos.push(product);
    }
    renderizarProdutos();
}

function addProduct() {
    const productIdInput = document.getElementById('productSearch');
    const productId = productIdInput.value;
    buscaProduto(productId)
        .then(produto => {

            const product = {
                id: produto.id,
                name: produto.nome,
                price: produto.preco_saco
            };

            if (product) {
                adicionarProduto(product);
            }
        })
        .catch(error => {
            console.error(`Erro durante a solicitação: ${error.message}`);
        });
}


function removerProduto(productId) {
    produtos = produtos.filter(p => p.id !== productId);
    renderizarProdutos();
}

function buscaProduto(productId) {
    return fetch(`http://192.168.1.229:8080/produto/${productId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na solicitação: ${response.status}`);
            }
            return response.json();
        });
}


function buscaProdutoCodigo(codigo) {
    return fetch(`http://192.168.1.229:8080/produto/codigo/${codigo}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na solicitação: ${response.status}`);
            }
            return response.json();
        });
}

