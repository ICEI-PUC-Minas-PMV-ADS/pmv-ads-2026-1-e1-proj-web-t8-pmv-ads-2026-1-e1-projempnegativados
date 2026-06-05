function entrar() {

  let email_login = document.querySelector("#email_login").value;
  let senha_login = document.querySelector("#senha_login").value;
  let msgError = document.querySelector("#msgError");

  // Carrega lista de usuários
  let listaUser = JSON.parse(localStorage.getItem("listaUser") || "[]");

  // Procura usuário pelo e-mail
  let usuarioEncontrado = listaUser.find(item => item.emailUser === email_login);

  // Se o usuário NÃO existir → redireciona para cadastro
  if (!usuarioEncontrado) {
      alert("Usuário não encontrado! Faça seu cadastro.");
      window.location.href = "../paginaCadastro/cadastre-se.html";
      return;
  }

  // Se existir mas a senha estiver errada
  if (usuarioEncontrado.SenhaUser !== senha_login) {
      msgError.innerHTML = "Senha incorreta!";
      msgError.style.display = "block";
      return;
  }

  // Se tudo estiver correto → login bem-sucedido
  let userValid = {
      nome: usuarioEncontrado.nomeUser,
      email: usuarioEncontrado.emailUser,
      cpfcnpj: usuarioEncontrado.cpfcnpjUser,
      senha: usuarioEncontrado.SenhaUser
  };

  // Cria token
  let token = Math.random().toString(16).substr(2) + Math.random().toString(16).substr(2);
  localStorage.setItem("token", token);

  // Salva usuário logado
  localStorage.setItem("userLogado", JSON.stringify(userValid));

  // Redireciona para o perfil
  window.location.href = "../paginaperfil/perfil.html";
}
