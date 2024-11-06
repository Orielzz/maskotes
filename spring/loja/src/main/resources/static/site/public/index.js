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
        
        if (barcode && barcode.startsWith('2')) {
            let id = barcode.substring(1,5);
            if(id == 0 ){
                id = 624;
            }
            buscaProduto(id)
            .then(produto=>{
                const valor = formatarValor(barcode.substring(6,12));
                const qtd = valor / produto.preco_quilo;
                const product = {
                    id: produto.id,
                    name: produto.nome,
                    price: valor,
                };

                if (product) {
                    adicionarProduto(product);
                    
                }
                barcodeSearch.value = '';
            })
            .catch(error => {
                console.error(`Erro durante a solicitação: ${error.message}`);
            });    
        }else if(barcode){
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
        }else {console.error('Codigo de Barras Inválido')}
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

document.getElementById("paymentType").addEventListener('change',function (){
    const val = document.getElementById("paymentType").value;
    const divtroco = document.getElementById("div-troco");
    if (val == 1) {
            divtroco.classList.remove("d-none");
    }else{
        if (divtroco.classList.contains("d-none")) {
            
        }else{
            divtroco.classList.add("d-none");
        }
    }
})







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
            return response.text().then(text => {
                throw new Error(`Erro na requisição Ajax: ${response.status} - ${text}`);
            });
        }
        return response.json(); // Converte a resposta para JSON
    })
    .then(json => {
        if (json.id) {
            successCallback(json); // Chama a função de sucesso com o JSON
            return json.id; // Retorna o id, se existir
        } else {
            throw new Error('Resposta JSON não contém o id esperado');
        }
    })
    .catch(error => {
        errorCallback(error); // Chama a função de erro com o erro
        throw error; // Propaga o erro para tratamento adicional
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
const idGenerico = 624;
const idDesconto = 733;
function adicionarProduto(product) {
    const produtoExistente = produtos.find(p => p.id === product.id);
    if (produtoExistente && product.id != idGenerico) {
        produtoExistente.quantidade++;
    }else{
        product.quantidade = 1;
        produtos.push(product);
    }
    renderizarProdutos();
}





function calculaTroco(){
    const valorRecebido = document.getElementById("troco").value;
    const totalVenda = calcularValorTotalVenda();

    
    document.getElementById("valor-troco").textContent = 'Troco a ser Dado: '+ (valorRecebido - totalVenda).toFixed(2) + 'R$';
}





document.getElementById("troco").addEventListener('change',
    ev=>{
        calculaTroco();
    }
)

function addProduct() {
    const productIdInput = document.getElementById('productSearch');
    const productId = productIdInput.value;
    buscaProduto(productId)
        .then(produto => {
            let product;
            if(productId == idGenerico || productId == idDesconto){
                 product = {
                    id: produto.id,
                    name: produto.nome,
                    price: document.getElementById("precoGenerico").value
                };
            }else{
                 product = {
                    id: produto.id,
                    name: produto.nome,
                    price: produto.preco_saco
                };
            }
            if (product) {
                adicionarProduto(product);
            }
        })
        .catch(error => {
            console.error(`Erro durante a solicitação: ${error.message}`);
        });
}


function removerProduto(productId,productPrice) {
    produtos.forEach(p =>{
        if(p.id==productId){
            p.quantidade -= 1;
            if (p.quantidade <= 0) {
                produtos = produtos.filter(p => !(p.id === productId && p.price === productPrice));
            }
        }
    })
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
            return response.json(); // Retorna a Promise do JSON
        });
}



    
    
    function formatarValor(valor) {
   

    // Extrair os últimos 2 dígitos como a parte decimal
    const parteDecimal = valor.slice(-2); // Últimos 2 dígitos
    const parteInteira = valor.slice(0, -2); // Resto da string

    // Combinar as partes
    const valorFormatado = `${parteInteira}.${parteDecimal}`;

    // Converter para número com ponto flutuante
    return parseFloat(valorFormatado);
}
    



function renderizarProdutos() {
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = ''; // Limpar o conteúdo atual

    let totalVenda = 0; // Inicializar o total da venda

    produtos.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('mb-3');

        const productInnerDiv = document.createElement('div');
        productInnerDiv.classList.add('d-flex', 'justify-content-between', 'align-items-center');

        const productNameSpan = document.createElement('span');
        productNameSpan.textContent = `${product.name} - R$ ${product.price} - Quantidade: ${product.quantidade}`;

        const subtotalSpan = document.createElement('span');
        const subtotal = product.price * product.quantidade;
        subtotalSpan.textContent = `- Subtotal: R$ ${subtotal.toFixed(2)}`;

        totalVenda += subtotal; // Adicionar o subtotal ao total da venda
        
        
        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.classList.add('btn', 'btn-danger');
        removeButton.textContent = 'Remover';
        removeButton.addEventListener('click', function() {
            removerProduto(product.id,product.price);
        });

        productInnerDiv.appendChild(productNameSpan);
        productInnerDiv.appendChild(subtotalSpan); // Adicionar o subtotal ao elemento
        productInnerDiv.appendChild(removeButton);

        productDiv.appendChild(productInnerDiv);
        productContainer.appendChild(productDiv);
    });

    // Exibir o valor total da venda
    const totalVendaSpan = document.getElementById('totalVenda');
    totalVendaSpan.textContent = `Valor Total da Venda: R$ ${totalVenda.toFixed(2)}`;
}


$('#productSearch').on('select2:select', function (e) {
    const productIdInput = document.getElementById('productSearch');
    const productId = productIdInput.value;
    const precoGenericoDiv = document.getElementById("divPrecoGenerico");

    if(productId == idGenerico || productId == idDesconto){
        precoGenericoDiv.classList.remove("d-none");
    }else{
        precoGenericoDiv.classList.add("d-none");
    }
});


$(document).on('select2:open', () => {
    document.querySelector('.select2-search__field').focus();
  });


document.addEventListener("keydown", function(event) {
    if (event.key === "F1") {
        event.preventDefault();
        const productSearch = $("#productSearch");
        productSearch.focus();
    }
    if (event.key === "F2") {
        event.preventDefault();
        document.getElementById("barcodeSearch").focus();
    }
    if (event.key === "F3") {
        event.preventDefault();
        document.getElementById("paymentType").focus();
    }
    if (event.key === "F4") {
        event.preventDefault();
        document.getElementById("troco").focus();
    }
});


