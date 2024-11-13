const apiUrl = "http://192.168.1.229:8080/produto";
const meuModalAlterar = new bootstrap.Modal(document.getElementById('alterarProdutoModal'));
const meuModalExcluir = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));

document.addEventListener("DOMContentLoaded", function () {

    initializeSelect2("#animalSelect", "http://192.168.1.229:8080/animal", "nome", 0);
    initializeSelect2("#fornecedorSelect", "http://192.168.1.229:8080/fornecedor", "nome", 0);
    initializeSelect2("#idadeSelect", "http://192.168.1.229:8080/idade", "descricao", 0);
    initializeSelect2("#marcaSelect", "http://192.168.1.229:8080/marca", "nome", 0);
    initializeSelect2("#porteSelect", "http://192.168.1.229:8080/porte", "descricao", 0);
    initializeSelect2("#tipoProdutoSelect", "http://192.168.1.229:8080/tipo-produto", "descricao", 0);

    const table = criarTabela();

    document.getElementById("salvarAlteracaoBtn").addEventListener("click", function () {
        const productId = this.dataset.productId;
        const novoProduto = {
            id: productId,
            nome: document.getElementById("nome").value,
            peso: document.getElementById("peso").value,
            preco_custo: document.getElementById("preco_custo").value,
            porcentagem_saco: document.getElementById("porcentagem_saco").value,
            porcentagem_varejo: document.getElementById("porcentagem_varejo").value,
            sabor: document.getElementById("sabor").value,
            preco_saco: document.getElementById("preco_saco").value,
            preco_quilo: document.getElementById("preco_quilo").value,
            codigoBarras: document.getElementById("codigoBarras").value,
            animal: { id: document.getElementById("animalSelect").value },
            fornecedor: { id: document.getElementById("fornecedorSelect").value },
            idade: { id: document.getElementById("idadeSelect").value },
            marca: { id: document.getElementById("marcaSelect").value },
            porte: { id: document.getElementById("porteSelect").value },
            tipoProduto: { id: document.getElementById("tipoProdutoSelect").value }
        };
        fecharModal(meuModalAlterar);
        alterarProduto(productId, novoProduto,table);
    });
    showAllProducts(table);
});

document.getElementById('porcentagem_saco').addEventListener('change',calcularPrecosComPorcentagem);
document.getElementById('porcentagem_varejo').addEventListener('change',calcularPrecosComPorcentagem);
document.getElementById('preco_saco').addEventListener('change',calcularPorcentagemComPrecos);
document.getElementById('preco_quilo').addEventListener('change',calcularPorcentagemComPrecos);

document.getElementById('botaoX').addEventListener('click',() => fecharModal(meuModalExcluir));
document.getElementById('cancelBtn').addEventListener('click',() =>fecharModal(meuModalExcluir));

function alterarProduto(productId, novoProduto , table) {
    fetch(`${apiUrl}/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoProduto)
    })
    .then(response => showAllProducts(table))
    .catch(error => console.error("Falha na solicitação Ajax:", error));
}

function showAllProducts(table) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(products => {
            table.clear().rows.add(products).draw();  // Atualiza a tabela com todos os produtos
        })
        .catch(error => {
            console.error('Falha na solicitação Fetch:', error);
        });
}



function criarTabela(){
  const table = new DataTable('#productTable', {
    columns: [
        { title: "ID", data: "id" },
        { title: "Nome", data: "nome" },
        { title: "Peso", data: "peso" },
        { title: "Marca", data: "marca.nome" },
        { title: "Animal", data: "animal.nome" },
        { title: "Idade", data: "idade.descricao" },
        { title: "Sabor", data: "sabor" },
        { title: "Porte", data: "porte.descricao" },
        { title: "Tipo Produto", data: "tipoProduto.descricao" },
        { title: "Preço Saco", data: "preco_saco" },
        { title: "Preço Quilo", data: "preco_quilo" },
        { title: "Porcentagem Saco", data: "porcentagem_saco" },
        { title: "Porcentagem Varejo", data: "porcentagem_varejo" },
        { title: "Fornecedor", data: "fornecedor.nome" },
        { title: "Custo", data: "preco_custo" },
        { 
            title: "Ações", 
            data: null, 
            render : function(data,type,row){
                return renderizarBotoes(row.id);
            }    
        }
    ],
    layout:{
        topStart:{
            buttons: [
                'colvis','pageLength'
                ]
        }
    },
    stateSave:true,
    paging: true,
    searching: true,
    ordering: true,
    lengthMenu: [  [10, 50, 100, 300, 500, 1000], [10, 50, 100, 300, 500, 1000] ],
    pageLength: 100,
    language: {
        lengthMenu: "Mostrar _MENU_ entradas",
        search: "Pesquisar:",
        info: "Mostrando _START_ a _END_ de _TOTAL_ entradas",
        infoEmpty: "Nenhum resultado encontrado",
        infoFiltered: "(filtrado de _MAX_ entradas totais)",
        zeroRecords: "Nenhum registro encontrado"
    }
    });
return table;
}
function criarBotaoAlterar(idProduto){
    const bt = document.createElement('button');
    bt.classList.add('btn','btn-info');
    bt.innerText = '📝';
    bt.addEventListener('click', function() {
        abrirModalAlteração(idProduto);
    });
        return bt ;
}

function criarBotaoExcluir(produtoId){
    const bt = document.createElement('button');
    bt.classList.add('btn','btn-danger');
    bt.innerText = '❌';
    bt.addEventListener('click', function() {
        deleteProduct(produtoId);
    });
    return bt;
}

function renderizarBotoes(idProduto) {
    const div = document.createElement('div');
    div.classList.add('d-flex', 'gap-2');
    div.appendChild(criarBotaoAlterar(idProduto));
    div.appendChild(criarBotaoExcluir(idProduto));
    return div;
}


function setValueAndTriggerChange(selector, dataId, dataText) {
    const element = document.querySelector(selector);
    if (!element) return;

    let option = Array.from(element.options).find(opt => opt.value == dataId);
    if (!option) {
        option = document.createElement("option");
        option.value = dataId;
        option.text = dataText;
        element.appendChild(option);
    }
    element.value = dataId;
}

function abrirModal(modal){
    modal.show();
}
function fecharModal(modal){
   modal.hide();
}

function abrirModalAlteração(productId) {
    fetch(`${apiUrl}/${productId}`)
        .then(response => response.json())
        .then(data => {
            ["nome", "peso", "preco_custo", "porcentagem_saco", "porcentagem_varejo", "sabor", "preco_saco", "preco_quilo", "codigoBarras"].forEach(id => {
                document.getElementById(id).value = data[id];
            });
            setValueAndTriggerChange("#animalSelect", data.animal.id, data.animal.nome);
            setValueAndTriggerChange("#fornecedorSelect", data.fornecedor.id, data.fornecedor.nome);
            setValueAndTriggerChange("#idadeSelect", data.idade.id, data.idade.descricao);
            setValueAndTriggerChange("#marcaSelect", data.marca.id, data.marca.nome);
            setValueAndTriggerChange("#porteSelect", data.porte.id, data.porte.descricao);
            setValueAndTriggerChange("#tipoProdutoSelect", data.tipoProduto.id, data.tipoProduto.descricao);
            document.getElementById("salvarAlteracaoBtn").dataset.productId = productId;
            abrirModal(meuModalAlterar);
        })
        .catch(error => console.error("Erro durante a solicitação:", error));
}

function deleteProduct(productId) {
    abrirModal(meuModalExcluir);
    document.getElementById("confirmDeleteBtn").onclick = function () {
        fetch(`${apiUrl}/${productId}`, { method: "DELETE" })
            .then(response => showAllProducts())
            .catch(error => console.error("Falha na solicitação Ajax:", error));
        fecharModal(meuModalExcluir);
    };
}

function initializeSelect2(selector, url, textField, minimumInputLength) {
    const element = document.querySelector(selector);
    if (!element) return;

    element.addEventListener("input", function (event) {
        const term = event.target.value;
        fetch(term ? `${url}/nome/${encodeURIComponent(term)}` : url)
            .then(response => response.json())
            .then(data => {
                element.innerHTML = ""; // Limpa opções anteriores
                data.forEach(item => {
                    const option = document.createElement("option");
                    option.value = item.id;
                    option.text = item[textField];
                    element.appendChild(option);
                });
            })
            .catch(error => console.error("Falha na solicitação Ajax:", error));
    });
}

function calcularPrecosComPorcentagem() {
    const precoCusto = parseFloat(document.getElementById("preco_custo").value) || 0;
    const porcentagemSaco = parseFloat(document.getElementById("porcentagem_saco").value) || 0;
    const porcentagemVarejo = parseFloat(document.getElementById("porcentagem_varejo").value) || 0;
    const peso = parseFloat(document.getElementById("peso").value) || 0;

    document.getElementById("preco_saco").value = (precoCusto * (1 + porcentagemSaco / 100)).toFixed(2).replace(',', '.');
    document.getElementById("preco_quilo").value = ((precoCusto * (1 + porcentagemVarejo / 100)) / peso).toFixed(2).replace(',', '.');
}

function calcularPorcentagemComPrecos() {
    const precoCusto = parseFloat(document.getElementById("preco_custo").value) || 0;
    const precoSaco = parseFloat(document.getElementById("preco_saco").value) || 0;
    const precoQuilo = parseFloat(document.getElementById("preco_quilo").value) || 0;
    const peso = parseFloat(document.getElementById("peso").value) || 0;

    document.getElementById("porcentagem_saco").value = (((precoSaco / precoCusto) - 1) * 100).toFixed(0);
    document.getElementById("porcentagem_varejo").value = (((precoQuilo * peso / precoCusto) - 1) * 100).toFixed(0);
}
