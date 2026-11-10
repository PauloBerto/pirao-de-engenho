// Pirão de Engenho - script.js
// esse arquivo é usado em todas as páginas, então cada função
// confere se o elemento existe antes de mexer nele


// 1 - horário de funcionamento (página inicial)

// posição 0 = domingo, 1 = segunda ... 6 = sábado
// segunda fica 0 porque o restaurante não abre
var horaAbre = [11, 0, 11, 11, 11, 11, 11];
var horaFecha = [16, 0, 22, 22, 22, 22, 23];
var nomesDias = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

function mostrarFuncionamento(){
    var status = document.getElementById("status-funcionamento");

    if(status == null){
        return;
    }

    var agora = new Date();
    var dia = agora.getDay();
    var hora = agora.getHours();  

    if(horaAbre[dia] == 0){
        status.innerHTML = "Hoje é " + nomesDias[dia] + " e estamos <strong>fechados</strong>. Voltamos amanhã às 11h.";
    }
    else if(hora >= horaAbre[dia] && hora < horaFecha[dia]){
        status.innerHTML = "Estamos <strong>abertos agora</strong>. Hoje funcionamos até as " + horaFecha[dia] + "h.";
    }
    else if(hora < horaAbre[dia]){
        status.innerHTML = "Ainda não abrimos. Hoje o salão abre às <strong>" + horaAbre[dia] + "h</strong>.";
    }
    else{
        status.innerHTML = "Já encerramos por hoje. Obrigado pela visita!";
    }
}

mostrarFuncionamento();


// 2 - trocar a foto da galeria

function trocarFoto(miniatura, legenda){
    document.getElementById("imagem-grande").src = miniatura.src;
    document.getElementById("imagem-grande").alt = miniatura.alt;
    document.getElementById("legenda-foto").innerHTML = legenda;

    // tira a marcação de todas e coloca só na que foi clicada
    var todas = document.getElementById("miniaturas").getElementsByTagName("img");
    for(var i = 0; i < todas.length; i++){
        todas[i].className = "";
    }
    miniatura.className = "selecionada";
}


// 3 - validar o formulário de contato

function validarFormulario(){
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var telefone = document.getElementById("telefone").value;
    var assunto = document.getElementById("assunto").value;
    var pessoas = document.getElementById("pessoas").value;
    var mensagem = document.getElementById("mensagem").value;

    if(nome == "" || email == ""|| telefone == "" || mensagem == ""){
        alert("Preencha nome, e-mail, telefone e mensagem.");
        return false;
    }

    if(email.indexOf("@") == -1 || email.indexOf(".") == -1){
        alert("O e-mail digitado não parece válido.");
        return false;
    }

    // conta só os números do telefone (com DDD tem que ter pelo menos 10)
    var qtdNumeros = 0;
    for(var i = 0; i < telefone.length; i++){
        if(telefone[i] >= "0" && telefone[i] <= "9"){
            qtdNumeros ++;
        }
    }
    if(qtdNumeros < 10){
        alert("Digite o telefone com DDD.");
        return false;
    }

    if(assunto == ""){
        alert("Escolha o assunto da mensagem.");
        return false;
    }

    if(assunto == "reserva" && pessoas == ""){
        alert("Para reservas, informe a quantidade de pessoas.");
        return false;
    }

    var confirmou = confirm("Confirma o envio da mensagem, " + nome + "?");

    if(confirmou){
        document.getElementById("retorno-form").innerHTML = "Obrigado, <strong>" + nome + "</strong>! Recebemos sua mensagem e vamos responder pelo e-mail " + email + ".";
        document.getElementById("form-contato").reset();
    }

    // o site não tem servidor, então a página não é enviada de verdade
    return false;
}
