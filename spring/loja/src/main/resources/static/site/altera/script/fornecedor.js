$(document).ready(function() {
    // URL da API
    const apiUrl = "http://localhost:8080/fornecedor";
  
    // Manipulador de evento para alteração no campo de pesquisa
    $("#searchInput").on("input", function() {
      const searchTerm = $(this).val();
  
      // Faça uma chamada AJAX para obter os fornecedores com base no termo de pesquisa
      $.ajax({
        url: searchTerm ? `${apiUrl}/nome/${encodeURIComponent(searchTerm)}` : apiUrl,
        method: "GET",
        dataType: "json",
        success: function(fornecedores) {
          // Exiba os fornecedores na tabela
          showFornecedores(fornecedores);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error('Falha na solicitação Ajax:', textStatus, errorThrown);
        }
      });
    });
  
    // Função para exibir todos os fornecedores na tabela
    function showAllFornecedores() {
      // Faça uma chamada AJAX para obter todos os fornecedores
      $.ajax({
        url: apiUrl,
        method: "GET",
        dataType: "json",
        success: function(fornecedores) {
          // Exiba todos os fornecedores na tabela
          showFornecedores(fornecedores);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error('Falha na solicitação Ajax:', textStatus, errorThrown);
        }
      });
    }
  
    // Função para alterar um fornecedor
    function alterarFornecedor(fornecedorId, novoFornecedor) {
      // Lógica para enviar os dados atualizados para o servidor
      $.ajax({
        url: `${apiUrl}/${fornecedorId}`,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(novoFornecedor),
        success: function(response) {
          // Após a alteração bem-sucedida, você pode recarregar os fornecedores
          showAllFornecedores();
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error('Falha na solicitação Ajax:', textStatus, errorThrown);
        }
      });
    }
  
    // Função para exibir fornecedores na tabela
    function showFornecedores(fornecedores) {
      const tableBody = $("#fornecedorTableBody");
      tableBody.empty();
  
      fornecedores.forEach(fornecedor => {
        const row = $("<tr>");
        row.append($("<td>").text(fornecedor.id));
        row.append($("<td>").text(fornecedor.nome));
        row.append($("<td>").text(fornecedor.numero));
  
        // Coluna de Ações
        const actionsColumn = $("<td>");
        const alterarButton = $(`<button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#alterarFornecedorModal" data-fornecedor-id="${fornecedor.id}">Alterar</button>`);
        const excluirButton = $(`<button class="btn btn-danger btn-sm" data-fornecedor-id="${fornecedor.id}">Excluir</button>`);
  
        // Adiciona eventos aos botões
        alterarButton.click(function() {
          const fornecedorId = $(this).data("fornecedor-id");
          loadFornecedorDataForAlteration(fornecedorId);
        });
  
        excluirButton.click(function() {
          const fornecedorId = $(this).data("fornecedor-id");
          deleteFornecedor(fornecedorId);
        });
  
        // Adiciona botões à coluna de ações
        actionsColumn.append(alterarButton);
        actionsColumn.append(" ");
        actionsColumn.append(excluirButton);
        row.append(actionsColumn);
  
        tableBody.append(row);
      });
    }
  
    // Função para carregar dados do fornecedor no modal de alteração
    function loadFornecedorDataForAlteration(fornecedorId) {
      $.ajax({
        url: `${apiUrl}/${fornecedorId}`,
        method: "GET",
        dataType: "json",
        success: function(data) {
          $("#nomeFornecedor").val(data.nome);
          $("#numeroFornecedor").val(data.numero);
          $("#salvarAlteracaoBtn").data("fornecedor-id", fornecedorId);
          $('#alterarFornecedorModal').modal('show');
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error('Falha na solicitação Ajax:', textStatus, errorThrown);
        }
      });
    }
  
   // Função para excluir um fornecedor
function deleteFornecedor(fornecedorId) {
    // Exibir modal de confirmação
    $('#confirmDeleteModal').modal('show');
  
    // Capturar o clique no botão de confirmação de exclusão
    $('#confirmDeleteBtn').click(function() {
      // Lógica para excluir o fornecedor
      $.ajax({
        url: `${apiUrl}/${fornecedorId}`,
        method: "DELETE",
        success: function(response) {
          // Após a exclusão bem-sucedida, você pode recarregar os fornecedores
          showAllFornecedores();
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error('Falha na solicitação Ajax:', textStatus, errorThrown);
        }
      });
      
      // Fechar modal de confirmação após exclusão
      $('#confirmDeleteModal').modal('hide');
    });
  
    // Capturar o clique no botão de cancelar
    $('#cancelBtn').click(function() {
      $('#confirmDeleteModal').modal('hide');
    });
  
    // Capturar o clique no botão de fechar (X)
    $('#botaoX').click(function() {
      $('#confirmDeleteModal').modal('hide');
    });
  }
  
    // Evento ao clicar no botão "Salvar Alterações" no modal de alteração
    $("#salvarAlteracaoBtn").click(function() {
      const fornecedorId = $(this).data("fornecedor-id");
      const novoFornecedor = {
        id: fornecedorId,
        nome: $("#nomeFornecedor").val(),
        numero: $("#numeroFornecedor").val()
      };
  
      alterarFornecedor(fornecedorId, novoFornecedor);
      $('#alterarFornecedorModal').modal('hide');
    });
  
    showAllFornecedores();
  });
  