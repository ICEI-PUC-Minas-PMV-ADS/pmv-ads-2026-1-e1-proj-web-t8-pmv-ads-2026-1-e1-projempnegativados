let userLogado = JSON.parse(localStorage.getItem("userLogado"))
let listaUser = JSON.parse(localStorage.getItem("listaUser")) || []

// Proteção: se não estiver logado, volta para login
if (!localStorage.getItem("token")) {
    window.location.href = "../pagina-login/login.html"
}

// Preenche dados na tela
document.querySelector("#nomeUser").innerHTML = userLogado.nome
document.querySelector("#emailUser").innerHTML = userLogado.email
document.querySelector("#cpfcnpjUser").innerHTML = userLogado.cpfcnpj

// Botões
document.querySelector("#sair").addEventListener("click", () => {
    localStorage.removeItem("token")
    window.location.href = "../pagina-login/login.html"
})

document.querySelector("#editar").addEventListener("click", () => {
    document.querySelector("#editarPerfil").classList.remove("hidden")
    document.querySelector("#perfil").classList.add("hidden")

    document.querySelector("#editNome").value = userLogado.nome
    document.querySelector("#editEmail").value = userLogado.email
    document.querySelector("#editCpfcnpj").value = userLogado.cpfcnpj

})

document.querySelector("#cancelarEdicao").addEventListener("click", () => {
    document.querySelector("#editarPerfil").classList.add("hidden")
    document.querySelector("#perfil").classList.remove("hidden")
})

document.querySelector("#salvarEdicao").addEventListener("click", () => {

    let novoNome = document.querySelector("#editNome").value
    let novoEmail = document.querySelector("#editEmail").value
    let novoCpfcnpj = document.querySelector("#editCpfcnpj").value

    // Atualiza listaUser
    listaUser = listaUser.map(user => {
        if (user.emailUser === userLogado.email) {
            return {
                ...user,
                nomeUser: novoNome,
                emailUser: novoEmail,
                cpfcnpjUser: novoCpfcnpj
            }
        }
        return user
    })

    // Salva
    localStorage.setItem("listaUser", JSON.stringify(listaUser))

    // Atualiza userLogado
    userLogado.nome = novoNome
    userLogado.email = novoEmail
    userLogado.cpfcnpj = novoCpfcnpj

    localStorage.setItem("userLogado", JSON.stringify(userLogado))

    window.location.reload()
})

document.querySelector("#excluir").addEventListener("click", () => {
    if (confirm("Tem certeza que deseja excluir sua conta?")) {

       // Remove o usuário da lista
listaUser = listaUser.filter(user => user.emailUser !== userLogado.email)
localStorage.setItem("listaUser", JSON.stringify(listaUser))

// Remove sessão
localStorage.removeItem("token")
localStorage.removeItem("userLogado")

// Evita voltar com botão "voltar"
history.replaceState(null, null, "../pagina-login/login.html")
window.location.href = "../pagina-login/login.html"

    }
})
