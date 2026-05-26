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
    alert("Preencha o formulário corretamente!");
    Senha.focus();
    return;
  }

  if (ConfirmeSenha.value == "") {
    alert("Preencha o formulário corretamente!");
    ConfirmeSenha.focus();
    return;
  }

  if (Senha.value != ConfirmeSenha.value) {
    alert("As senhas não correspondem!");
    ConfirmeSenha.focus();
    return;
  }

  // Pega lista de usuários já cadastrados (ou cria lista vazia)
  let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]')

  // Adiciona novo usuário
  listaUser.push({
    nomeUser: nome.value,
    emailUser: email.value,
    cpfcnpjUser: cpfcnpj.value,
    SenhaUser: Senha.value
  })

  // Salva de volta no localStorage
  localStorage.setItem("listaUser", JSON.stringify(listaUser))

  alert("Usuário cadastrado com sucesso!");
  window.location.href = "../pagina-login/login.html"
}
