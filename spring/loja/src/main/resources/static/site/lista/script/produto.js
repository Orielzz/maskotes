const apiUrl = "http://192.168.1.108:8080/produto";
document.addEventListener('DOMContentLoaded', function() {

  const table = criarTabela();    
  showAllProducts(table);
});

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
        { title: "Peso", data: "peso" },
        { title: "Nome", data: "nome" },
        { title: "Marca", data: "marca.nome" },
        { title: "Animal", data: "animal.nome" },
        { title: "Idade", data: "idade.descricao" },
        { title: "Sabor", data: "sabor" },
        { title: "Porte", data: "porte.descricao" },
        { title: "Tipo Produto", data: "tipoProduto.descricao" },
        { title: "Preço Saco", data: "preco_saco" },
        { title: "Preço Quilo", data: "preco_quilo" }
    ],
    paging: true,
    searching: true,
    ordering: true,
   // dom: 'Bfrltip', // Define onde os botões aparecerão
   dom: "<'row'<'col-sm-12 col-md-3'B><'col-sm-12 col-md-3'l><'col-sm-12 col-md-6'f>>" +
"<'row'<'col-sm-12'tr>>" +
"<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
  buttons: [
    {
      extend: 'colvis', // Botão de visibilidade das colunas
      text: 'Selecionar Colunas'
    }
  ],
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
