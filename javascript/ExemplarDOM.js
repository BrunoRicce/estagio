//Controle dos select da BExemplar
let select = document.getElementById('estante');

select.addEventListener('change', function () {
    let selecionada = document.getElementById("estante");
    let str = selecionada.value.split('/');
    document.getElementById("prat").style = "";
    let prateleira = document.getElementById("prateleira");
    document.getElementById("prateleira").length = 0;

    if (selecionada.value != '')
        for (let i = 0; i < Number(str[1]); i++) {
            let info = i + 1;
            let op = document.createElement("option");
            op.innerHTML = info;
            op.value = info;
            prateleira.appendChild(op);
        }
    else
        document.getElementById("prat").style = "display: none;"
});