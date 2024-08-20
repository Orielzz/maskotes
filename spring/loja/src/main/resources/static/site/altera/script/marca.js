$(document).ready(function() {
    // URL da API
    const apiUrl = "http://192.168.1.229:8080/marca";
    
    // Manipulador de evento para alteração no campo de pesquisa
    $("#searchInput").on("input", function() {
        const searchTerm = $(this).val();
  
        // Faça uma chamada AJAX para obter as marcas com base no termo de pesquisa
        $.ajax({
            url: searchTerm ? `${apiUrl}/nome/${encodeURIComponent(searchTerm)}` : apiUrl,
            method: "GET",
            dataType: "json",
            success: function(marcas) {
                // Exiba as marcas na tabela
                showMarcas(marcas);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Falha na solicitação Ajax:', textStatus, errorThrown);
            }
        });
    });
  
    // Função para exibir todas as marcas na tabela
    function showAllMarcas() {
        // Faça uma chamada AJAX para obter todas as marcas
        $.ajax({
            url: apiUrl,
            method: "GET",
            dataType: "json",
            success: function(marcas) {
                // Exiba todas as marcas na tabela
                showMarcas(marcas);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Falha na solicitação Ajax:', textStatus, errorThrown);
            }
        });
    }
  
    // Função para alterar uma marca
    function alterarMarca(marcaId, novaMarca) {
        // Lógica para enviar os dados atualizados para o servidor
        $.ajax({
            url: `${apiUrl}/${marcaId}`,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(novaMarca),
            success: function(response) {
                // Recarrega as marcas após a alteração
                showAllMarcas();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Falha na solicitação Ajax:', textStatus, errorThrown);
            }
        });
    }
  
    // Função para exibir marcas na tabela
    function showMarcas(marcas) {
        const tableBody = $("#marcaTableBody");
        tableBody.empty();
  
        marcas.forEach(marca => {
            const row = $("<tr>");
            row.append($("<td>").text(marca.id));
            row.append($("<td>").text(marca.nome));
            
            // Coluna de Ações
            const actionsColumn = $("<td>");
            const alterarButton = $(`<button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#alterarMarcaModal" data-marca-id="${marca.id}">Alterar</button>`);
            const excluirButton = $(`<button class="btn btn-danger btn-sm" data-marca-id="${marca.id}">Excluir</button>`);
  
            // Adiciona eventos aos botões
            alterarButton.click(function() {
                const marcaId = $(this).data("marca-id");
                loadMarcaDataForAlteration(marcaId);
            });
  
            excluirButton.click(function() {
                const marcaId = $(this).data("marca-id");
                deleteMarca(marcaId);
            });
  
            // Adiciona botões à coluna de ações
            actionsColumn.append(alterarButton);
            actionsColumn.append(" ");
            actionsColumn.append(excluirButton);
            row.append(actionsColumn);
  
            tableBody.append(row);
        });
    }
  
    // Função para carregar dados da marca no modal de alteração
    function loadMarcaDataForAlteration(marcaId) {
        fetch(`${apiUrl}/${marcaId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na solicitação: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Popule os campos do formulário com os dados da marca
                $("#nome").val(data.nome);
                $("#salvarAlteracaoBtn").data("marca-id", marcaId);
  
                // Abre o modal
                $('#alterarMarcaModal').modal('show');
            })
            .catch(error => {
                console.error(`Erro durante a solicitação: ${error.message}`);
            });
    }
  
    // Função para excluir uma marca
    function deleteMarca(marcaId) {
        // Exibir modal de confirmação
        $('#confirmDeleteModal').modal('show');
    
        // Capturar o clique no botão de confirmação de exclusão
        $('#confirmDeleteBtn').click(function() {
            // Lógica para excluir a marca
            $.ajax({
                url: `${apiUrl}/${marcaId}`,
                method: "DELETE",
                success: function(response) {
                    // Após a exclusão bem-sucedida, recarrega as marcas
                    showAllMarcas();
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
        const marcaId = $(this).data("marca-id");
        const novaMarca = {
            id: marcaId,
            nome: $("#nome").val()
        };
  
        // Chame a função para alterar a marca
        alterarMarca(marcaId, novaMarca);
  
        // Fecha o modal após salvar as alterações
        $('#alterarMarcaModal').modal('hide');
    });
  
    // Exibe todas as marcas ao carregar a página
    showAllMarcas();
});
