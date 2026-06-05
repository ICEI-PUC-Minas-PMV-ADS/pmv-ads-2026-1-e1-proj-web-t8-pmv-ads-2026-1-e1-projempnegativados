function cadastrar() {

  // Validações básicas
  if (nome.value == "" || nome.value.length < 4) {
    alert("Preencha o formulário corretamente!");
    nome.focus();
    return;
  }

  if (email.value == "") {
    alert("Preencha o formulário corretamente!");
    email.focus();
    return;
  }

  if (cpfcnpj.value == "" || cpfcnpj.value.length < 11) {
    alert("Preencha o formulário corretamente!");
    cpfcnpj.focus();
    return;
  }

  if (Senha.value == "" || Senha.value.length < 6) {
    alert("A senha deve ter pelo menos 6 caracteres!");
    Senha.focus();
    return;
  }

  if (ConfirmeSenha.value == "") {
    alert("Confirme sua senha!");
    ConfirmeSenha.focus();
    return;
  }

  if (Senha.value != ConfirmeSenha.value) {
    alert("As senhas não correspondem!");
    ConfirmeSenha.focus();
    return;
  }

  // Carrega lista de usuários
  let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');

  // Verifica se o e-mail já está cadastrado
  let emailExistente = listaUser.find(user => user.emailUser === email.value);

  if (emailExistente) {
    alert("Este e-mail já está cadastrado! Faça login.");
    window.location.href = "../pagina-login/login.html";
    return;
  }

  // Adiciona novo usuário
  listaUser.push({
    nomeUser: nome.value,
    emailUser: email.value,
    cpfcnpjUser: cpfcnpj.value,
    SenhaUser: Senha.value
  });

  // Salva no localStorage
  localStorage.setItem("listaUser", JSON.stringify(listaUser));

  alert("Usuário cadastrado com sucesso!");
  window.location.href = "../pagina-login/login.html";
}
