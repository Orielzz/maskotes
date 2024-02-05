$(document).ready(function() {
    // URL da API
    const apiUrl = "http://localhost:8080/produto";

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

   
      // ...

      // Função para exibir produtos na tabela
      function showProducts(products) {
        const tableBody = $("#productTableBody");
        tableBody.empty();

        products.forEach(product => {
          const row = $("<tr>");
          row.append($("<td>").text(product.codigoBarras));
          row.append($("<td>").text(product.nome));
          row.append($("<td>").text(product.marca.nome));
          row.append($("<td>").text(product.animal.nome));
          row.append($("<td>").text(product.idade.descricao));
          row.append($("<td>").text(product.sabor));
          row.append($("<td>").text(product.porte.descricao));
          row.append($("<td>").text(product.tipoProduto.descricao));
          row.append($("<td>").text(product.precoSaco));
          row.append($("<td>").text(product.precoQuilo));
          row.append($("<td>").text(product.precoCusto));
          row.append($("<td>").text(product.porcentagemSaco));
          row.append($("<td>").text(product.porcentagemVarejo));
          row.append($("<td>").text(product.fornecedor.nome));
          
          // Coluna de Ações
          const actionsColumn = $("<td>");
          const alterarButton = $(`<button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#alterarProdutoModal" data-product-id="${product.id}">Alterar</button>`);
          const excluirButton = $(`<button class="btn btn-danger btn-sm" data-product-id="${product.id}">Excluir</button>`);

          // Adiciona eventos aos botões
          alterarButton.click(function() {
            // Lógica para carregar dados do produto no modal de alteração
            const productId = $(this).data("product-id");
            loadProductDataForAlteration(productId);
          });

          excluirButton.click(function() {
            // Lógica para excluir o produto
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

      // Função para carregar dados do produto no modal de alteração
      function loadProductDataForAlteration(productId) {
        fetch(`http://localhost:8080/produto/${productId}`)
  .then(response => {
    // Verifique se a solicitação foi bem-sucedida (status 2xx)
    if (!response.ok) {
      throw new Error(`Erro na solicitação: ${response.status}`);
    }

    // Parse a resposta JSON
    return response.json();
  })
  .then(data => {
    // Faça algo com os dados
    console.log(data);
  })
  .catch(error => {
    // Lidere com erros
    console.error(`Erro durante a solicitação: ${error.message}`);
  });

        // Exemplo: abre o modal (remova se não for necessário)
        $('#alterarProdutoModal').modal('show');
      }

      // Função para excluir um produto
      function deleteProduct(productId) {
        // Lógica para excluir o produto
        // Pode incluir uma chamada AJAX para enviar uma solicitação de exclusão ao servidor
        // ...

        // Exemplo: recarrega os produtos após a exclusão (remova se não for necessário)
        showAllProducts();
      }

      // Evento ao clicar no botão "Salvar Alterações" no modal de alteração
      $("#salvarAlteracaoBtn").click(function() {
        // Lógica para salvar as alterações
        // Pode incluir uma chamada AJAX para enviar os dados alterados ao servidor
        // ...

        // Exemplo: fecha o modal após salvar as alterações (remova se não for necessário)
        $('#alterarProdutoModal').modal('hide');
      });

      // ...
    
    // Exiba todos os produtos ao carregar a página
    showAllProducts();
  });