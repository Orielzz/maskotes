


$(document).ready(function() {
  // URL da API
  const apiUrl = "http://192.168.1.229:8080/produto";
  
 
    // Função para inicializar o Select2
    function initializeSelect2(selector, url, textField, minimumInputLength) {
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
    }

    // Inicialize o Select2 para cada seletor
    initializeSelect2('#animalSelect', 'http://192.168.1.229:8080/animal', 'nome', 0);
    initializeSelect2('#fornecedorSelect', 'http://192.168.1.229:8080/fornecedor', 'nome', 0);
    initializeSelect2('#idadeSelect', 'http://192.168.1.229:8080/idade', 'descricao', 0);
    initializeSelect2('#marcaSelect', 'http://192.168.1.229:8080/marca', 'nome', 0);
    initializeSelect2('#porteSelect', 'http://192.168.1.229:8080/porte', 'descricao', 0);
    initializeSelect2('#tipoProdutoSelect', 'http://192.168.1.229:8080/tipo-produto', 'descricao', 0);

    // Manipulador de evento para o evento 'shown.bs.modal' do Bootstrap
  
  // Manipulador de evento para alteração no campo de pesquisa
  $("#searchInput").on("input", function() {
      const searchTerm = $(this).val();

      // Faça uma chamada AJAX para obter os produtos com base no termo de pesquisa
      $.ajax({
          url: searchTerm ? `${apiUrl}/nome/${encodeURIComponent(searchTerm)}` : apiUrl,
          method: "GET",
          dataType: "json",
          success: function(products) {
              // Exiba os produtos na tabela
              showProducts(products);
          },
          error: function(jqXHR, textStatus, errorThrown) {
              console.error('Falha na solicitação Ajax:', textStatus, errorThrown);
          }
      });
  });

  // Função para exibir todos os produtos na tabela
  function showAllProducts() {
      // Faça uma chamada AJAX para obter todos os produtos
      $.ajax({
          url: apiUrl,
          method: "GET",
          dataType: "json",
          success: function(products) {
              // Exiba todos os produtos na tabela
              showProducts(products);
          },
          error: function(jqXHR, textStatus, errorThrown) {
              console.error('Falha na solicitação Ajax:', textStatus, errorThrown);
          }
      });
  }


  // Função para alterar um produto
function alterarProduto(productId, novoProduto) {
    // Lógica para enviar os dados atualizados para o servidor
    $.ajax({
        url: `http://192.168.1.229:8080/produto/${productId}`,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(novoProduto),
        success: function(response) {
            // Exemplo: recarrega os produtos após a alteração (remova se não for necessário)
            showAllProducts();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Falha na solicitação Ajax:', textStatus, errorThrown);
        }
    });
}


  // Função para exibir produtos na tabela
  function showProducts(products) {
      const tableBody = $("#productTableBody");
      tableBody.empty();

      products.forEach(product => {
          const row = $("<tr>");
          
          row.append($("<td>").text(product.nome));
          row.append($("<td>").text(product.peso));
          row.append($("<td>").text(product.marca.nome));
          row.append($("<td>").text(product.animal.nome));
          row.append($("<td>").text(product.idade.descricao));
          row.append($("<td>").text(product.sabor));
          row.append($("<td>").text(product.porte.descricao));
          row.append($("<td>").text(product.tipoProduto.descricao));
          row.append($("<td>").text(product.preco_saco));
          row.append($("<td>").text(product.preco_quilo));
          row.append($("<td>").text(product.preco_custo));
          row.append($("<td>").text(product.porcentagem_saco));
          row.append($("<td>").text(product.porcentagem_varejo));
          row.append($("<td>").text(product.fornecedor.nome));

          // Coluna de Ações
          const actionsColumn = $("<td>");
          const alterarButton = $(`<button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#alterarProdutoModal" data-product-id="${product.id}">Alterar</button>`);
          const excluirButton = $(`<button class="btn btn-danger btn-sm" data-product-id="${product.id}">Excluir</button>`);

          // Adiciona eventos aos botões
          alterarButton.click(function() {
              const productId = $(this).data("product-id");
              loadProductDataForAlteration(productId);
          });

          excluirButton.click(function() {
              const productId = $(this).data("product-id");
              deleteProduct(productId);
          });

          // Adiciona botões à coluna de ações
          actionsColumn.append(alterarButton);
          actionsColumn.append(" ");
          actionsColumn.append(excluirButton);
          row.append(actionsColumn);

          tableBody.append(row);
      });
  }
  function setValueAndTriggerChange(selector, dataId, dataText) {
    if ($(selector).find("option[value='" + dataId + "']").length) {
        $(selector).val(dataId).trigger('change');
    } else { 
        // Create a DOM Option and pre-select by default
        var newOption = new Option(dataText, dataId, true, true);
        // Append it to the select
        $(selector).append(newOption).trigger('change');
    }
}
  // Função para carregar dados do produto no modal de alteração
function loadProductDataForAlteration(productId) {
    fetch(`http://192.168.1.229:8080/produto/${productId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na solicitação: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
           
            // Popule os campos do formulário com os dados do produto
            $("#nome").val(data.nome);
            $("#peso").val(data.peso);
            $("#preco_custo").val(data.preco_custo);
            $("#porcentagem_saco").val(data.porcentagem_saco);
            $("#porcentagem_varejo").val(data.porcentagem_varejo);
            $("#sabor").val(data.sabor);
            $("#preco_saco").val(data.preco_saco);
            $("#preco_quilo").val(data.preco_quilo);
            $("#codigoBarras").val(data.codigoBarras);
            
            // Atualiza os Select2 com os valores corretos
           // Set the value, creating a new option if necessary
           setValueAndTriggerChange("#animalSelect", data.animal.id, data.animal.nome);
           setValueAndTriggerChange("#fornecedorSelect", data.fornecedor.id, data.fornecedor.nome);
           setValueAndTriggerChange("#idadeSelect", data.idade.id, data.idade.descricao);
           setValueAndTriggerChange("#marcaSelect", data.marca.id, data.marca.nome);
           setValueAndTriggerChange("#porteSelect", data.porte.id, data.porte.descricao);
           setValueAndTriggerChange("#tipoProdutoSelect", data.tipoProduto.id, data.tipoProduto.descricao);


            // Atualize o atributo de dados (data attribute) do botão "Salvar Alterações" com o ID do produto
            $("#salvarAlteracaoBtn").data("product-id", productId);

            // Exemplo: abre o modal (remova se não for necessário)
            $('#alterarProdutoModal').modal('show');
        })
        .catch(error => {
            console.error(`Erro durante a solicitação: ${error.message}`);
        });
}




// Função para excluir um produto
function deleteProduct(productId) {
    // Exibir modal de confirmação
    $('#confirmDeleteModal').modal('show');
  
    // Capturar o clique no botão de confirmação de exclusão
    $('#confirmDeleteBtn').click(function() {
      // Lógica para excluir o produto
      $.ajax({
        url: `http://192.168.1.229:8080/produto/${productId}`,
        method: "DELETE",
        success: function(response) {
          // Após a exclusão bem-sucedida, você pode recarregar os produtos
          showAllProducts();
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error('Falha na solicitação Ajax:', textStatus, errorThrown);
        }
      });
      
      // Fechar modal de confirmação após exclusão
      $('#confirmDeleteModal').modal('hide');
    });
  
    // Capturar o clique no botão de cancelar
    $('#cancelBtn').click( function () {
        $('#confirmDeleteModal').modal('hide');
     
    });
    $('#botaoX').click( function () {
        $('#confirmDeleteModal').modal('hide');
     
    });
  
  }
  
  
  

  // Evento ao clicar no botão "Salvar Alterações" no modal de alteração
  $("#salvarAlteracaoBtn").click(function() {
      // Lógica para salvar as alterações
      // Pode incluir uma chamada AJAX para enviar os dados alterados ao servidor
      // ...
      const productId = $(this).data("product-id");
      console.log(productId);
      const novoProduto = {
        id: productId,
        nome: $("#nome").val(),
        peso:$("#peso").val(),
        preco_custo: $("#preco_custo").val(),
        porcentagem_saco: $("#porcentagem_saco").val(),
        porcentagem_varejo: $("#porcentagem_varejo").val(),
        sabor: $("#sabor").val(),
        preco_saco: $("#preco_saco").val(),
        preco_quilo: $("#preco_quilo").val(),
        codigoBarras: $("#codigoBarras").val(),
        animal: { id: $("#animalSelect").val() },
        fornecedor: { id: $("#fornecedorSelect").val() },
        idade: { id: $("#idadeSelect").val() },
        marca: { id: $("#marcaSelect").val() },
        porte: { id: $("#porteSelect").val() },
        tipoProduto: { id: $("#tipoProdutoSelect").val() }
    };


    // Chame a função para alterar o produto
    alterarProduto(productId, novoProduto);

      // Exemplo: fecha o modal após salvar as alterações (remova se não for necessário)
      $('#alterarProdutoModal').modal('hide');
  });

  // Exiba todos os produtos ao carregar a página
  showAllProducts();
});    

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

