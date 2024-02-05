document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita o comportamento padrão de enviar o formulário

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const basicAuth = 'Basic ' + btoa(username + ':' + password);

  fetch('http://localhost:8080/usuarios', {
      method: 'GET', // ou 'POST', 'PUT', etc., dependendo do método que você precisa
      headers: {
          'Authorization': basicAuth
      }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Falha na autenticação');
      }
      // Continua com o processamento se a autenticação foi bem-sucedida
  })
  .catch(error => {
      console.error('Erro:', error);
  });
});