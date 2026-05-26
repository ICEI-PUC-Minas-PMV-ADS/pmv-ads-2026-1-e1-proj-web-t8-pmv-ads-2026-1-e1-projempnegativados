function entrar() {

  let email_login = document.querySelector("#email_login")
  let senha_login = document.querySelector("#senha_login")
  let msgError = document.querySelector("#msgError")

  // Carrega lista de usuários
  let listaUser = JSON.parse(localStorage.getItem("listaUser") || "[]")

  // Objeto para armazenar o usuário encontrado
  let userValid = null

  // Procura usuário na lista
  listaUser.forEach((item) => {
    if (email_login.value === item.emailUser && senha_login.value === item.SenhaUser) {
      userValid = {
        nome: item.nomeUser,
        email: item.emailUser,
        cpfcnpj: item.cpfcnpjUser,
        senha: item.SenhaUser
      }
    }
  })

  // Se encontrou o usuário
  if (userValid) {

    // Cria token
    let token = Math.random().toString(16).substr(2) + Math.random().toString(16).substr(2)
    localStorage.setItem("token", token)

    // Salva usuário logado
    localStorage.setItem("userLogado", JSON.stringify(userValid))

    // Redireciona
    window.location.href = "../paginaperfil/perfil.html"
    return
  }

   
}