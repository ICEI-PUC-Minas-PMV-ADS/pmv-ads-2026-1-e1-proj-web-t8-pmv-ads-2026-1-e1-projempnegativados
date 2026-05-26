let userLogado = JSON.parse(localStorage.getItem("userLogado"))
let listaUser = JSON.parse(localStorage.getItem("listaUser")) || []

// Proteção: se não estiver logado, volta para login
if (!localStorage.getItem("token")) {
    window.location.href = "../pagina-login/login.html"
}

// Preenche dados na tela
document.querySelector("#nomeUser").innerHTML = userLogado.nome
document.querySelector("#emailUser").innerHTML = userLogado.email
document.querySelector("#telefoneUser").innerHTML = userLogado.telefone || "Não informado"

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
    document.querySelector("#editTelefone").value = userLogado.telefone
})

document.querySelector("#cancelarEdicao").addEventListener("click", () => {
    document.querySelector("#editarPerfil").classList.add("hidden")
    document.querySelector("#perfil").classList.remove("hidden")
})

document.querySelector("#salvarEdicao").addEventListener("click", () => {

    let novoNome = document.querySelector("#editNome").value
    let novoEmail = document.querySelector("#editEmail").value
    let novoTelefone = document.querySelector("#editTelefone").value

    // Atualiza listaUser
    listaUser = listaUser.map(user => {
        if (user.emailUser === userLogado.email) {
            return {
                ...user,
                nomeUser: novoNome,
                emailUser: novoEmail,
                telefoneUser: novoTelefone
            }
        }
        return user
    })

    // Salva
    localStorage.setItem("listaUser", JSON.stringify(listaUser))

    // Atualiza userLogado
    userLogado.nome = novoNome
    userLogado.email = novoEmail
    userLogado.telefone = novoTelefone

    localStorage.setItem("userLogado", JSON.stringify(userLogado))

    window.location.reload()
})

document.querySelector("#excluir").addEventListener("click", () => {
    if (confirm("Tem certeza que deseja excluir sua conta?")) {

        listaUser = listaUser.filter(user => user.emailUser !== userLogado.email)
        localStorage.setItem("listaUser", JSON.stringify(listaUser))

        localStorage.removeItem("token")
        localStorage.removeItem("userLogado")

        window.location.href = "../pagina-login/login.html"
    }
})
