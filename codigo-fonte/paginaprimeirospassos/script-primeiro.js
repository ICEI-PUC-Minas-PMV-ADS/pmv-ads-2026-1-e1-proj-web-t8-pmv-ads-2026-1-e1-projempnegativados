// ===============================
// PEGAR USUÁRIO LOGADO
// ===============================
let userLogado = JSON.parse(localStorage.getItem("userLogado"));
let emailUser = userLogado ? userLogado.email : null;

// ===============================
// CARREGAR DADOS AO ABRIR A PÁGINA
// ===============================
window.onload = function () {
    carregarDados();
    calcularTudo();
};

// ===============================
// FUNÇÃO PARA PEGAR VALOR NUMÉRICO
// ===============================
function getNumber(id) {
    let v = parseFloat(document.getElementById(id).value);
    return isNaN(v) ? 0 : v;
}

// ===============================
// CÁLCULO PRINCIPAL
// ===============================
function calcularTudo() {

    // RENDAS
    let r1 = getNumber("renda1");
    let r2 = getNumber("renda2");
    
    let rendaTotal = r1 + r2;
    document.getElementById("rendaTotal").innerText = rendaTotal.toFixed(2);

    // GASTOS
    let g1 = getNumber("gasto1");
    let g2 = getNumber("gasto2");
    let g3 = getNumber("gasto3");
    let g4 = getNumber("gasto4");
    let g5 = getNumber("gasto5");
    let g6 = getNumber("gasto6");
    let g7 = getNumber("gasto7");
    let g8 = getNumber("gasto8");
    
    let gastoTotal = g1 + g2 + g3 + g4 + g5 + g6 + g7 + g8;
    document.getElementById("gastoTotal").innerText = gastoTotal.toFixed(2);

    // ENDIVIDAMENTO
    let endividamento = 0;
    if (rendaTotal > 0) {
        endividamento = (gastoTotal / rendaTotal) * 100;
    }
    document.getElementById("endividamento").innerText = endividamento.toFixed(1) + "%";

    gerarComentario(rendaTotal, gastoTotal, endividamento, g1, g2);
}

// ===============================
// GERAR COMENTÁRIOS INTELIGENTES
// ===============================
function gerarComentario(rendaTotal, gastoTotal, endividamento, moradia, aluguel) {

    let texto = "";

    if (rendaTotal === 0) {
        texto = "Digite suas rendas para iniciar a análise.";
        document.getElementById("comentarioTexto").innerText = texto;
        return;
    }

    if (moradia > rendaTotal * 0.30) {
        texto += "⚠ Você está gastando mais de 30% da renda com moradia.\n\n";
    } else {
        texto += "✔ Seus gastos com moradia estão dentro do limite saudável.\n\n";
    }

    if (aluguel > rendaTotal * 0.30) {
        texto += "⚠ Seu gasto com aluguel ultrapassa 30% da renda.\n\n";
    }

    if (endividamento <= 60) {
        texto += "✔ Seu nível de endividamento está saudável.\n\n";
    } else if (endividamento > 60 && endividamento <= 85) {
        texto += "⚠ Atenção: seu endividamento está moderado.\n\n";
    } else {
        texto += "❌ Seu endividamento está crítico!\n\n";
    }

    let sobra = rendaTotal - gastoTotal;
    if (sobra > 0) {
        texto += "✔ Você ainda possui saldo positivo.\n\n";
    } else {
        texto += "⚠ Você está gastando mais do que ganha.\n\n";
    }

    document.getElementById("comentarioTexto").innerText = texto;
}

// ===============================
// SALVAR NO LOCALSTORAGE (POR USUÁRIO)
// ===============================
function salvarAnalise() {

    let dados = {
        renda1: getNumber("renda1"),
        renda2: getNumber("renda2"),
       
        gasto1: getNumber("gasto1"),
        gasto2: getNumber("gasto2"),
        gasto3: getNumber("gasto3"),
        gasto4: getNumber("gasto4"),
        gasto5: getNumber("gasto5"),
        gasto6: getNumber("gasto6"),
        gasto7: getNumber("gasto7"),
        gasto8: getNumber("gasto8")
    };

    // Salva usando o e-mail do usuário
    localStorage.setItem("analiseFinanceira_" + emailUser, JSON.stringify(dados));

    alert("Dados salvos com sucesso!");
}

// ===============================
// CARREGAR DO LOCALSTORAGE (POR USUÁRIO)
// ===============================
function carregarDados() {

    let dados = JSON.parse(localStorage.getItem("analiseFinanceira_" + emailUser));

    if (!dados) return;

    document.getElementById("renda1").value = dados.renda1;
    document.getElementById("renda2").value = dados.renda2;
    
    document.getElementById("gasto1").value = dados.gasto1;
    document.getElementById("gasto2").value = dados.gasto2;
    document.getElementById("gasto3").value = dados.gasto3;
    document.getElementById("gasto4").value = dados.gasto4;
    document.getElementById("gasto5").value = dados.gasto5;
    document.getElementById("gasto6").value = dados.gasto6;
    document.getElementById("gasto7").value = dados.gasto7;
    document.getElementById("gasto8").value = dados.gasto8;
}

// ===============================
// ATUALIZAR CÁLCULOS AO DIGITAR
// ===============================
document.addEventListener("input", function () {
    calcularTudo();
});
