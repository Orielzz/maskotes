


$(document).ready(function() {
    // URL da API
    const apiUrl = "http://localhost:8080/animal";
    
   
    
    
    // Manipulador de evento para alteração no campo de pesquisa
    $("#searchInput").on("input", function() {
        const searchTerm = $(this).val();
  
        // Faça uma chamada AJAX para obter os produtos com base no termo de pesquisa
        $.ajax({
            url: searchTerm ? `${apiUrl}/nome/${encodeURIComponent(searchTerm)}` : apiUrl,
            method: "GET",
            dataType: "json",
            success: function(animals) {
                // Exiba os produtos na tabela
                showAnimals(animals);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Falha na solicitação Ajax:', textStatus, errorThrown);
            }
        });
    });
  
    // Função para exibir todos os produtos na tabela
    function showAllAnimals() {
        // Faça uma chamada AJAX para obter todos os produtos
        $.ajax({
            url: apiUrl,
            method: "GET",
            dataType: "json",
            success: function(animals) {
                // Exiba todos os produtos na tabela
                showAnimals(animals);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Falha na solicitação Ajax:', textStatus, errorThrown);
            }
        });
    }
  
  
    // Função para alterar um produto
  function alterarAnimal(animalId, novoAnimal) {
      // Lógica para enviar os dados atualizados para o servidor
      $.ajax({
          url: `http://localhost:8080/animal/${animalId}`,
          method: "PUT",
          contentType: "application/json",
          data: JSON.stringify(novoAnimal),
          success: function(response) {
              // Exemplo: recarrega os produtos após a alteração (remova se não for necessário)
              showAllAnimals();
          },
          error: function(jqXHR, textStatus, errorThrown) {
              console.error('Falha na solicitação Ajax:', textStatus, errorThrown);
          }
      });
  }
  
  
    // Função para exibir produtos na tabela
    function showAnimals(animal) {
        const tableBody = $("#animalTableBody");
        tableBody.empty();
  
        animal.forEach(animal => {
            const row = $("<tr>");
            row.append($("<td>").text(animal.id));
            row.append($("<td>").text(animal.nome));
            
  
            // Coluna de Ações
            const actionsColumn = $("<td>");
            const alterarButton = $(`<button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#alterarProdutoModal" data-animal-id="${animal.id}">Alterar</button>`);
            const excluirButton = $(`<button class="btn btn-danger btn-sm" data-animal-id="${animal.id}">Excluir</button>`);
  
            // Adiciona eventos aos botões
            alterarButton.click(function() {
                const animalId = $(this).data("animal-id");
                loadAnimalDataForAlteration(animalId);
            });
  
            excluirButton.click(function() {
                const animalId = $(this).data("animal-id");
                deleteAnimal(animalId);
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
  function loadAnimalDataForAlteration(animalId) {
      fetch(`http://localhost:8080/animal/${animalId}`)
          .then(response => {
              if (!response.ok) {
                  throw new Error(`Erro na solicitação: ${response.status}`);
              }
              return response.json();
          })
          .then(data => {
             
              // Popule os campos do formulário com os dados do produto
              $("#nome").val(data.nome);
              
              
             
              $("#salvarAlteracaoBtn").data("animal-id", animalId);
  
              // Exemplo: abre o modal (remova se não for necessário)
              $('#alterarAnimalModal').modal('show');
          })
          .catch(error => {
              console.error(`Erro durante a solicitação: ${error.message}`);
          });
  }
  
  
  
  
  // Função para excluir um produto
  function deleteAnimal(animalId) {
      // Exibir modal de confirmação
      $('#confirmDeleteModal').modal('show');
    
      // Capturar o clique no botão de confirmação de exclusão
      $('#confirmDeleteBtn').click(function() {
        // Lógica para excluir o produto
        $.ajax({
          url: `http://localhost:8080/animal/${animalId}`,
          method: "DELETE",
          success: function(response) {
            // Após a exclusão bem-sucedida, você pode recarregar os produtos
            showAllAnimals();
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
        const animalId = $(this).data("animal-id");
       
        const novoAnimal = {
          id: animalId,
          nome: $("#nome").val()
      };
  
  
      // Chame a função para alterar o produto
      alterarAnimal(animalId, novoAnimal);
  
        // Exemplo: fecha o modal após salvar as alterações (remova se não for necessário)
        $('#alterarAnimalModal').modal('hide');
    });
  
   
    
   showAllAnimals();
  });
  