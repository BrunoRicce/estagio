
function mySubmitFunction(ex, can) {
    if (ex == 'ex') {
        return confirm("Tem certeza que deseja excluir?");
    }
    else {
            let flag = true;
            let campos = document.getElementById('formCad').querySelectorAll("[required]")
            // console.log(campos[0].value);
            // console.log(campos.length);
            for (let i = 0; i < campos.length; i++)
                campos[i].style.color = '';

            for (let i = 0; i < campos.length; i++)
                if (campos[i].value == '') {
                    flag = false;
                    campos[i].style.color = 'red';
                }
            return flag;
            //let estado = document.getElementById("est").value;
        }
}

// function excluir()
// {
//     mySubmitFunction('ex','');
// }