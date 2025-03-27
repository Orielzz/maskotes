$(document).ready(function() {
    // URL da API
    const apiUrl = "http://192.168.1.108:8080/tipo-produto";
    
    // Manipulador de evento para alteração no campo de pesquisa
    $("#searchInput").on("input", function() {
        const searchTerm = $(this).val();
  
        // Faça uma chamada AJAX para obter os tipos de produto com base na descrição
        $.ajax({
            url: searchTerm ? `${apiUrl}/nome/${encodeURIComponent(searchTerm)}` : apiUrl,
            method: "GET",
            dataType: "json",
            success: function(tiposProduto) {
                // Exiba os tipos de produto na tabela
                showTiposProduto(tiposProduto);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Falha na solicitação Ajax:', textStatus, errorThrown);
            }
        });
    });
  
    // Função para exibir todos os tipos de produto na tabela
    function showAllTiposProduto() {
        // Faça uma chamada AJAX para obter todos os tipos de produto
        $.ajax({
            url: apiUrl,
            method: "GET",
            dataType: "json",
            success: function(tiposProduto) {
                // Exiba todos os tipos de produto na tabela
                showTiposProduto(tiposProduto);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Falha na solicitação Ajax:', textStatus, errorThrown);
            }
        });
    }
  
    // Função para alterar um tipo de produto
    function alterarTipoProduto(tipoProdutoId, novoTipoProduto) {
        // Lógica para enviar os dados atualizados para o servidor
        $.ajax({
            url: `${apiUrl}/${tipoProdutoId}`,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(novoTipoProduto),
            success: function(response) {
                // Recarrega os tipos de produto após a alteração
                showAllTiposProduto();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Falha na solicitação Ajax:', textStatus, errorThrown);
            }
        });
    }
  
    // Função para exibir tipos de produto na tabela
    function showTiposProduto(tiposProduto) {
        const tableBody = $("#tipoProdutoTableBody");
        tableBody.empty();
  
        tiposProduto.forEach(tipoProduto => {
            const row = $("<tr>");
            row.append($("<td>").text(tipoProduto.id));
            row.append($("<td>").text(tipoProduto.descricao));
            
            // Coluna de Ações
            const actionsColumn = $("<td>");
            const alterarButton = $(`<button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#alterarTipoProdutoModal" data-tipo-produto-id="${tipoProduto.id}">Alterar</button>`);
            const excluirButton = $(`<button class="btn btn-danger btn-sm" data-tipo-produto-id="${tipoProduto.id}">Excluir</button>`);
  
            // Adiciona eventos aos botões
            alterarButton.click(function() {
                const tipoProdutoId = $(this).data("tipo-produto-id");
                loadTipoProdutoDataForAlteration(tipoProdutoId);
            });
  
            excluirButton.click(function() {
                const tipoProdutoId = $(this).data("tipo-produto-id");
                deleteTipoProduto(tipoProdutoId);
            });
  
            // Adiciona botões à coluna de ações
            actionsColumn.append(alterarButton);
            actionsColumn.append(" ");
            actionsColumn.append(excluirButton);
            row.append(actionsColumn);
  
            tableBody.append(row);
        });
    }
  
    // Função para carregar dados do tipo de produto no modal de alteração
    function loadTipoProdutoDataForAlteration(tipoProdutoId) {
        fetch(`${apiUrl}/${tipoProdutoId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na solicitação: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Popule os campos do formulário com os dados do tipo de produto
                $("#descricao").val(data.descricao);
                $("#salvarAlteracaoBtn").data("tipo-produto-id", tipoProdutoId);
  
                // Abre o modal
                $('#alterarTipoProdutoModal').modal('show');
            })
            .catch(error => {
                console.error(`Erro durante a solicitação: ${error.message}`);
            });
    }
  
    // Função para excluir um tipo de produto
    function deleteTipoProduto(tipoProdutoId) {
        // Exibir modal de confirmação
        $('#confirmDeleteModal').modal('show');
    
        // Capturar o clique no botão de confirmação de exclusão
        $('#confirmDeleteBtn').click(function() {
            // Lógica para excluir o tipo de produto
            $.ajax({
                url: `${apiUrl}/${tipoProdutoId}`,
                method: "DELETE",
                success: function(response) {
                    // Após a exclusão bem-sucedida, recarrega os tipos de produto
                    showAllTiposProduto();
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
        const tipoProdutoId = $(this).data("tipo-produto-id");
        const novoTipoProduto = {
            id: tipoProdutoId,
            descricao: $("#descricao").val()
        };
  
        // Chame a função para alterar o tipo de produto
        alterarTipoProduto(tipoProdutoId, novoTipoProduto);
  
        // Fecha o modal após salvar as alterações
        $('#alterarTipoProdutoModal').modal('hide');
    });
  
    // Exibe todos os tipos de produto ao carregar a página
    showAllTiposProduto();
});
