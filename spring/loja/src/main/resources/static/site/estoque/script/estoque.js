document.addEventListener('DOMContentLoaded', function() {
    // Inicializar o Select2
    const url = "http://192.168.1.229:8080/produto";

    initializeSelect2("#productSearch", url, "nome", "sabor", "porte", 0);

    const form = document.getElementById("estoqueForm");
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar o envio automático do formulário
        const dados = pegaDados();
        buscaEstoque(dados.id,dados,adicionaEstoque,atualizaEstoque,criaMsgErro2);
    });

    });

const dataAtual = new Date().toISOString().slice(0,10);




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


function pegaDados(){
    const id = document.getElementById('productSearch').value;
    const quantidade = document.getElementById('quantidade').value;
    if (id === null || quantidade === null) {
        erro = new Error('Campos Não Foram informados');
        criaMsgErro2(erro);
        return;
    }

    const object = 
        {  id: id, 
            quantidade: quantidade
        }
    ;

    return object;
}




function errorAjax(erro){
    if(erro == null){
        criaMsgErro2(new Error('Erro na função do ajax'));
        return
    }
    criaMsgErro2(erro);
    return

}





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




let produtos = [];

function adicionaEstoque(data){
    const preparajson = {
        quantidade:data.quantidade,
        produto:{
            id:data.id
        }
    };
    
    makeAjaxRequest('http://192.168.1.229:8080/estoque','POST',preparajson,criaMsgSucesso,criaMsgErro)
    return
}

function verificaEstocado(data) {
    return makeAjaxRequest(
        `http://192.168.1.229:8080/estoque/produto/${data.id}`,
        'GET',
        null,
        (json) => json.id, // Success callback that returns the id
        (error) => {
            console.error('Erro ao verificar estoque:', error);
            return null;
        }
    );
}





function atualizaEstoque(data) {
    verificaEstocado(data)
        .then(id => {
            if (!id) {
                console.error('ID do estoque não encontrado.');
                return;
            }

            const preparajson = {
                id: id,
                quantidade: data.quantidade,
                produto: {
                    id: data.id
                }
            };


            return makeAjaxRequest(
                `http://192.168.1.229:8080/estoque/${id}`,
                'PUT',
                preparajson,
                (json) => {
                    criaMsgSucesso('Estoque atualizado com sucesso!');
                },
                (error) => {
                    criaMsgErro('Erro ao atualizar estoque: ' + error.message);
                }
            );
        })
        .catch(error => {
            console.error('Erro ao processar atualização de estoque:', error);
        });
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
function buscaEstoque(productId,data ,adicionaCallback, atualizaCallback, errorCallback) {
    return fetch(`http://192.168.1.229:8080/estoque/produto/${productId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na solicitação: ${response.status}`);
            }
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                atualizaCallback(data,response.json);
            } else {
                adicionaCallback(data);
            }
        }).catch(Error=>{
            errorCallback(Error);

        });
}




