// ul onde ficarao as mensagens
const messagesDisplay = document.querySelector(".messages")
// usado para atualizar mensagens
let messagesList = "";
// nome de usuário
let userName = {
    name: ""
};

// tela de falha no login
let failure = document.querySelector(".failure")
// onde ficarao os contatos
let contactDisplay = document.querySelector(".contacts")
// sera usado para atualizar os contatos
let contactList = "";
// usado para selecionar todos caso o usuário selecionado saia
let contactsArray = []
// usuário selecionado
let contactSelected = null;
// Tipo da mensagem a ser enviada
let type = document.querySelector('.message-type.selected').querySelector("span").innerText;
// LOGAR NO CHAT
function login() {
    userName.name = document.querySelector(".username").value
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", userName)

    promise.then(loginSucess)
    promise.catch(loginFailure)


}


// LOGIN BEM SUCEDIDO => remove tela de login, envia status a cada 5s,atualiza e scrolla pra ultima msg a cada 3s
function loginSucess() {
    let loading = document.querySelector(".loading")
    let form = document.querySelector(".form")
    loading.style.display = "flex"
    form.style.display = "none"
    failure.style.display = "none"
    setInterval(searchMessages, 3000)
    searchMessages()
    setInterval(searchContacts, 5000);
    searchContacts();
    setTimeout(hideMenu, 2000)
    setInterval(sendStatus, 5000);
}

// envia status
function sendStatus() {
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", userName)
}
// esconde tela de login
function hideMenu() {
    let loginScreen = document.querySelector(".login-screen")

    loginScreen.classList.add("hidden")
}


// LOGIN FALHOU
function loginFailure() {
    let failure = document.querySelector(".failure")

    if (userName.name == null) {
        failure.innerHTML = "Nome de usuário inválido!"
    } else {
        failure.innerHTML = `
    O nome de usuário <strong>${userName.name}</strong> já está em uso, por favor escolha outro!`
    }

}



// RECEBE CONTATOS DO SERVIDOR
function searchContacts() {


    const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/participants")
    promise.then(insertContacts)
}
// cria display para os contatos
function insertContacts(response) {


    response.data.forEach(element => {
        contactsArray.push(element.name)
    })

    if (contactsArray.includes(contactSelected)) {
        contactList = `
    <li onclick="selectContact(this)" class="option contact">
        <ion-icon name="people"></ion-icon>
        <span>Todos</span>
        <img src="assets/Vector.png" alt="">
    </li>`;
    } else {
        contactSelected = null;
        contactList = `
    <li onclick="selectContact(this)" class="option contact selected">
        <ion-icon name="people"></ion-icon>
        <span>Todos</span>
        <img src="assets/Vector.png" alt="">
    </li>`;
    }
    contactsArray = []

    response.data.forEach(element => {

        if (element.name != userName.name) {
            if (element.name == contactSelected) {
                contactList += `
        <li onclick="selectContact(this)" class="option contact selected">
            <ion-icon name="people"></ion-icon>
            <span>${element.name}</span>
            <img src="assets/Vector.png" alt="">
        </li>`

            } else {
                contactList += `
        <li onclick="selectContact(this)" class="option contact">
            <ion-icon name="people"></ion-icon>
            <span>${element.name}</span>
            <img src="assets/Vector.png" alt="">
        </li>`

            }
        }
    });
    contactDisplay.innerHTML = contactList;
    changeText()
}


// RECEBE MENSAGENS DO SERVIDOR
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
    <li data-identifier="message" class="message status">
        <span>${element.time}</span>
        <p><strong>${element.from}</strong> ${element.text}</p>
    </li>`;
}
// gera mensagem normal
function normalMessage(element) {
    messagesList += `
    <li data-identifier="message" class="message all">
        <span>${element.time}</span>
        <p><strong>${element.from}</strong> para <strong>${element.to}</strong>: ${element.text}</p>
    </li>`
}
// gera mensagem privada
function privateMessage(element) {

    if (element.to == userName.name || element.from == userName.name) {
        messagesList += `
    <li data-identifier="message" class="message private">
        <span>${element.time}</span>
        <p><strong>${element.from}</strong> reservadamente para <strong>${element.to}</strong>: ${element.text}</p>
    </li>`
    }
}
// scrolla pra ultima mensagem
function scrollToLastMessage() {
    let lastMessage = document.querySelectorAll(".message");
    lastMessage = lastMessage[lastMessage.length - 1]
    lastMessage.scrollIntoView();
}


// ENVIAR MENSAGEM
function sendMessage() {

    type = document.querySelector('.message-type.selected').querySelector("span").innerText;
    let text = document.querySelector("#message-text");

    if (text.value !== "") {
        if (type == "Público") {
            type = "message";
        } else {
            type = "private_message"
        }
        let message = {
            from: userName.name,
            to: document.querySelector('.contact.selected').querySelector("span").innerText,
            text: text.value,
            type: type
        }

        const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", message)
        // promise.catch(refresh)

        text.value = "";
    }

}
// mudar texto em baixo do campo de mensagem            
function changeText() {
    let textDisplay = document.querySelector(".message-display").querySelector("span")

    console.log(textDisplay);
    if (contactSelected == null) {
        textDisplay.innerHTML = `Enviando para Todos (${type})`
    } else {
        type = document.querySelector('.message-type.selected').querySelector("span").innerText;
        textDisplay.innerHTML = `Enviando para ${contactSelected} (${type})`
        console.log(type)
    }

}


// atuliza caso nao consiga enviar mensagem
function refresh() {
    window.location.reload()
}


// FUNÇOES DO MENU LATERAL
function selectContact(element) {
    deselect('contact');
    element.classList.add("selected");
    contactSelected = element.querySelector("span").innerText;

    changeText()
}

function selectTypeMessage(element) {
    deselect('message-type');
    element.classList.add("selected");

    changeText()
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


// ENVIAR MENSAGEM COM ENTER
document.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {

        var btn = document.querySelector(".send-message");

        btn.click();

    }
});