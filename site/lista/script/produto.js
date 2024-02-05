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
        row.append($("<td>").text(product.preco_saco));
        row.append($("<td>").text(product.preco_quilo));
        // Adicione mais colunas conforme necessário
        tableBody.append(row);
      });
    }

    // Exiba todos os produtos ao carregar a página
    showAllProducts();
  });