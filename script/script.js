const messagesDisplay = document.querySelector(".messages")

let messagesList = "";
let userName = {
    name: ""
};
let numberOfMessages = 0;

// LOGAR NO CHAT
function login() {
    userName.name = document.querySelector(".username").value
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", userName)

    promise.then(loginSucess)
    promise.catch(loginFailure)


}

// LOGIN BEM SUCEDIDO => remove tela de login, envia status a cada 5s,atualiza e scrolla pra ultima msg a cada 3s
function loginSucess() {
    let loginScreen = document.querySelector(".login-screen")
    loginScreen.classList.add("hidden")
    setInterval(sendStatus, 5000);
    // setInterval(searchMessages, 3000)
    // zeraaaaaaaaar
}
// envia status
function sendStatus() {
    axios.post("https://mock-api.driven.com.br/api/v4/uol/status", userName)
}
// recebe mensagens do servidor
function searchMessages() {
    messagesList = ""
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages")
    promise.then(insertMessages)
}
// mostra mensagem
function insertMessages(response) {
    response.data.forEach((element, index) => {
        compareStatus(element, index);
        messagesDisplay.innerHTML = messagesList;
    });
    setTimeout(scrollToLastMessage, 200)
}
// gera o display das mensagens
function compareStatus(element) {
    if (element.type === "status") {

        statusMessage(element);
    } else if (element.type === "message") {

        normalMessage(element);
    } else if (element.type === "private_message") {

        privateMessage(element);
    }

}
// gera mensagem de status
function statusMessage(element) {
    messagesList += `
    <li class="message status">
        <span>${element.time}</span>
        <p><strong>${element.from}</strong> ${element.text}</p>
    </li>`;
    numberOfMessages++;
}
// gera mensagem normal
function normalMessage(element) {
    messagesList += `
    <li class="message all">
        <span>${element.time}</span>
        <p><strong>${element.from}</strong> para <strong>${element.to}</strong>: ${element.text}</p>
    </li>`
    numberOfMessages++;
}
// gera mensagem privada
function privateMessage(element) {
    
    if(element.to == userName.name || element.from == userName.name){
    messagesList += `
    <li class="message private">
        <span>${element.time}</span>
        <p><strong>${element.from}</strong> reservadamente para <strong>${element.to}</strong>: ${element.text}</p>
    </li>`
    numberOfMessages++;
    }
}

// scrolla pra ultima mensagem
function scrollToLastMessage() {
    const lastMessage = document.querySelectorAll(".message")[numberOfMessages - 1];
    // lastMessage.scrollIntoView();
    numberOfMessages = 0;
}

// LOGIN FALHOU
function loginFailure() {
    alert("Nome de usuario ja existente")
}


// ENVIAR MENSAGEM
function sendMessage() {

    let type = document.querySelector('.message-type.selected').querySelector("span").innerText
    if (type == "Público") {
        type = "message";
    } else {
        type = "private_message"
    }

    let text = document.querySelector("#message-text");
    console.log(text)
    let message = {
        from: userName.name,
        to: document.querySelector('.contact.selected').querySelector("span").innerText,
        text: text.value,
        type: type

    }
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", message)
// mensagem de erro quando n der pra enviar a mensagem
    text.value = "";
    
}
// FUNÇOES DO MENU LATERAL

function selectContact(element) {
    deselect('contact');
    element.classList.add("selected");
}

function selectTypeMessage(element) {
    deselect('message-type');
    element.classList.add("selected");
}

function deselect(className) {

    const elementSelected = document.querySelector(`.${className}.selected`)
    if (elementSelected !== null) {
        elementSelected.classList.remove("selected")
    }
}

function navInteract() {
    const blur = document.querySelector(".blur")
    blur.classList.toggle("hidden")
    const nav = document.querySelector("nav");
    nav.classList.toggle("show")
}