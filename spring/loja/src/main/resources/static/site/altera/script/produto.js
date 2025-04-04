const apiUrl = "http://192.168.1.108:8080/produto";
const meuModalAlterar = new bootstrap.Modal(document.getElementById('alterarProdutoModal'));
const meuModalExcluir = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
const urlPura = "http://192.168.1.108:8080";

document.addEventListener("DOMContentLoaded", function () {



    const table = criarTabela();


    document.getElementById("salvarAlteracaoBtn").addEventListener("click", function () {
        const productId = this.dataset.productId;
        console.log(productId);
        console.log(this);
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
            animal: { id: pegaId(document.getElementById("animalInput").value, "datalistAnimal") },
            fornecedor: { id: pegaId(document.getElementById("fornecedorInput").value, "datalistFornecedor") },
            idade: { id: pegaId(document.getElementById("idadeInput").value, "datalistIdade") },
            marca: { id: pegaId(document.getElementById("marcaInput").value, "datalistMarca") },
            porte: { id: pegaId(document.getElementById("porteInput").value, "datalistPorte") },
            tipoProduto: { id: pegaId(document.getElementById("tipoProdutoInput").value, "datalistTipoProduto") }
        };
        console.log(novoProduto); // console
        fecharModal(meuModalAlterar);
        alterarProduto(productId, novoProduto,table);
    });
    showAllProducts(table);
});

/**
 * Função que tenta encontrar no datalist uma opção com o mesmo valor digitado
 * e retorna o data-id correspondente.
 * @param {string} valorDigitado - Valor digitado no input.
 * @param {string} datalistId - ID do elemento <datalist> a ser verificado.
 * @returns {string} - O valor do data-id encontrado.
 * @throws {Error} - Se nenhuma opção corresponder ao valor digitado.
 */
function pegaId(valorDigitado, datalistId) {
    const datalist = document.getElementById(datalistId);
    if (!datalist) {
        throw new Error(`Datalist com ID "${datalistId}" não foi encontrado.`);
    }
    
    const option = Array.from(datalist.options)
        .find(option => option.value === valorDigitado);
    
    if (option) {
        return option.getAttribute('data-id');
    } else {
        throw new Error(`Opção "${valorDigitado}" não encontrada no datalist.`);
    }
}


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
    .catch(error => console.error("Falha ao alterar Produto:", error.message));
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

function desenharOpcoesDatalist(url,seletor,hiddenInputID,campo){
   fetch(url)
   .then(response => response.json()) 
   .then(dados => {
     const element = document.querySelector(seletor);
     element.innerHTML = ""; 
     dados.forEach(item => {
         const option = document.createElement("option");
         option.value = item[campo];
         option.dataset.id = item.id;
         option.dataset.hiddenId = hiddenInputID;
         element.appendChild(option);
     });
   })

}


function desenharTodasOpcoesDatalist(){
    desenharOpcoesDatalist(`${urlPura}/animal`, '#datalistAnimal','#animaId','nome');
    desenharOpcoesDatalist(`${urlPura}/fornecedor`, '#datalistFornecedor','#fornecedorId','nome');
    desenharOpcoesDatalist(`${urlPura}/marca`, '#datalistMarca','#marcaId','nome');
    desenharOpcoesDatalist(`${urlPura}/porte`, '#datalistPorte','#porteId','descricao');
    desenharOpcoesDatalist(`${urlPura}/idade`, '#datalistIdade','#idadeId','descricao');
    desenharOpcoesDatalist(`${urlPura}/tipo-produto`, '#datalistTipoProduto','#tipoProdutoId','descricao');
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

function abrirModal(modal){
    modal.show();
}
function fecharModal(modal){
   modal.hide();
}

function abrirModalAlteração(productId) {
    const botaoSalvar = document.querySelector('#salvarAlteracaoBtn');
    botaoSalvar.dataset.productId = productId;
    fetch(`${apiUrl}/${productId}`)
        .then(response => response.json())
        .then(data => {
            desenharTodasOpcoesDatalist();
            //document.getElementById("id").value = data.id;
            document.getElementById("nome").value = data.nome;
            document.getElementById("peso").value = data.peso;
            document.getElementById("sabor").value = data.sabor;
            document.getElementById("preco_custo").value = data.preco_custo;
            document.getElementById("preco_saco").value = data.preco_saco;
            document.getElementById("preco_quilo").value = data.preco_quilo;
            document.getElementById("porcentagem_saco").value = data.porcentagem_saco;
            document.getElementById("porcentagem_varejo").value = data.porcentagem_varejo;
            document.getElementById("codigoBarras").value = data.codigoBarras;
            document.getElementById("animalInput").value = data.animal.nome;
            document.getElementById("fornecedorInput").value = data.fornecedor.nome;
            document.getElementById("idadeInput").value = data.idade.descricao;
            document.getElementById("marcaInput").value = data.marca.nome;
            document.getElementById("porteInput").value = data.porte.descricao;
            document.getElementById("tipoProdutoInput").value = data.tipoProduto.descricao;
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
