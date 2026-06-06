// =======================================
// PEGAR USUÁRIO LOGADO
// =======================================
let userLogado = JSON.parse(localStorage.getItem("userLogado"));
let emailUser = userLogado ? userLogado.email : null;

// =======================================
// CARREGAR RELATÓRIOS AO ABRIR A PÁGINA
// =======================================
window.onload = function () {
    gerarRelatorio();
};

// =======================================
// FUNÇÃO PRINCIPAL
// =======================================
function gerarRelatorio() {

    let dados = JSON.parse(localStorage.getItem("analiseFinanceira_" + emailUser));

    if (!dados) {
        alert("Nenhuma análise encontrada. Preencha os dados em Primeiros Passos.");
        return;
    }

    // ============================
    // ENTRADAS
    // ============================
    let entradas = dados.renda1 + dados.renda2;

    // ============================
    // SAÍDAS (CATEGORIAS)
    // ============================
    let categorias = {
        "Aluguel": dados.gasto1,
        "Condomínio": dados.gasto2,
        "Alimentação": dados.gasto3,
        "Saúde": dados.gasto4,
        "Remédios": dados.gasto5,
        "Transporte": dados.gasto6,
        "Educação": dados.gasto7,
        "Lazer": dados.gasto8
    };

    let totalSaidas = Object.values(categorias).reduce((a, b) => a + b, 0);

    // ============================
    // SALDO
    // ============================
    let saldo = entradas - totalSaidas;

    // ============================
    // QUANTIDADE DE LANÇAMENTOS
    // ============================
    let qtdLancamentos = 2 + 8; // 2 rendas + 8 gastos

    // ============================
    // PREENCHER VISÃO GERAL
    // ============================
    document.getElementById("totalEntradas").innerText = entradas.toFixed(2);
    document.getElementById("totalSaidas").innerText = totalSaidas.toFixed(2);
    document.getElementById("saldoAtual").innerText = saldo.toFixed(2);
    document.getElementById("qtdLancamentos").innerText = qtdLancamentos;

    // ============================
    // GRÁFICO VISÃO GERAL
    // ============================
    new Chart(document.getElementById("graficoVisaoGeral"), {
        type: "pie",
        data: {
            labels: ["Entradas", "Saídas"],
            datasets: [{
                data: [entradas, totalSaidas],
                backgroundColor: ["#0cc05d", "#ff4d4d"]
            }]
        }
    });

    // ============================
    // LISTA DE CATEGORIAS + BARRAS
    // ============================
    let lista = document.getElementById("listaCategorias");
    lista.innerHTML = "";

    for (let categoria in categorias) {

        let valor = categorias[categoria];
        let percentual = totalSaidas > 0 ? (valor / totalSaidas) * 100 : 0;

        let item = `
            <div class="categoria-item">
                <strong>${categoria}:</strong> R$ ${valor.toFixed(2)} (${percentual.toFixed(1)}%)
                <div class="barra">
                    <div class="barra-preenchida" style="width: ${percentual}%;"></div>
                </div>
            </div>
        `;

        lista.innerHTML += item;
    }

    // ============================
    // GRÁFICO DE CATEGORIAS
    // ============================
    new Chart(document.getElementById("graficoCategorias"), {
        type: "pie",
        data: {
            labels: Object.keys(categorias),
            datasets: [{
                data: Object.values(categorias),
                backgroundColor: [
                    "#ff6b6b", "#ffa36c", "#ffd93d", "#6bcB77",
                    "#4d96ff", "#9d4edd", "#ff4d6d", "#00b4d8"
                ]
            }]
        }
    });
}
