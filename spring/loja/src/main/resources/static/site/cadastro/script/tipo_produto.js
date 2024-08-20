function preparaJson() {
    const json = {};
    
    // Obtém todos os campos do formulário
    const formFields = document.querySelectorAll('#tipoProdutoForm input');

    // Itera sobre os campos e adiciona ao JSON
    formFields.forEach(field => {
        const fieldName = field.name;
        const fieldValue = field.value;
        json[fieldName] = fieldValue;
    });

    return json;
}

const url = "http://192.168.1.229:8080/tipo-produto";

document.getElementById("tipoProdutoForm").addEventListener('submit', function (event) {
    event.preventDefault();

    // Limpa mensagens anteriores
    document.getElementById('mensagem').innerHTML = '';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(preparaJson()),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao cadastrar');
        }
        return response.json();
    })
    .then(data => {
        const mensagemSucesso = document.createElement('div');
        mensagemSucesso.className = 'alert alert-success';
        mensagemSucesso.textContent = 'Cadastro realizado com sucesso!';

        document.getElementById('mensagem').appendChild(mensagemSucesso);
        document.getElementById("tipoProdutoForm").reset(); // Limpa o formulário
    })
    .catch(error => {
        const mensagemErro = document.createElement('div');
        mensagemErro.className = 'alert alert-danger';
        mensagemErro.textContent = 'Erro ao cadastrar';

        document.getElementById('mensagem').appendChild(mensagemErro);
    });
});
