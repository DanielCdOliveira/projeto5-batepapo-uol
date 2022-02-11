const messagesDisplay = document.querySelector(".messages")
let messagesList = "";

let userName = {
    name: ""
};
let numberOfMessages = 0;

let failure = document.querySelector(".failure")

let contactDisplay = document.querySelector(".contacts")
let contactList = "";
let contactsArray = []

let contactSelected = "";

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
    let form = document.querySelector("form")
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
// LOGIN FALHOU
function loginFailure() {
    let failure = document.querySelector(".failure")
    failure.innerHTML = `
    O nome de usuário <strong>${userName.name}</strong> já está em uso, por favor escolha outro!`
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

// RECEBE CONTATOS DO SERVIDOR
function searchContacts() {

    console.log(contactSelected)
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/participants")
    promise.then(insertContacts)
}

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
        contactSelected = ""
        contactList = `
    <li onclick="selectContact(this)" class="option contact selected">
        <ion-icon name="people"></ion-icon>
        <span>Todos</span>
        <img src="assets/Vector.png" alt="">
    </li>`;
    }
    contactsArray = []

    response.data.forEach(element => {


        if (element.name == contactSelected) {
            contactList += `
        <li onclick="selectContact(this)" class="option contact selected">
            <ion-icon name="people"></ion-icon>
            <span>${element.name}</span>
            <img src="assets/Vector.png" alt="">
        </li>`
            contactDisplay.innerHTML = contactList;
        } else {
            contactList += `
        <li onclick="selectContact(this)" class="option contact">
            <ion-icon name="people"></ion-icon>
            <span>${element.name}</span>
            <img src="assets/Vector.png" alt="">
        </li>`
            contactDisplay.innerHTML = contactList;
        }
    });

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
    numberOfMessages++;
}
// gera mensagem normal
function normalMessage(element) {
    messagesList += `
    <li data-identifier="message" class="message all">
        <span>${element.time}</span>
        <p><strong>${element.from}</strong> para <strong>${element.to}</strong>: ${element.text}</p>
    </li>`
    numberOfMessages++;
}
// gera mensagem privada
function privateMessage(element) {

    if (element.to == userName.name || element.from == userName.name) {
        messagesList += `
    <li data-identifier="message" class="message private">
        <span>${element.time}</span>
        <p><strong>${element.from}</strong> reservadamente para <strong>${element.to}</strong>: ${element.text}</p>
    </li>`
        numberOfMessages++;
    }
}
// scrolla pra ultima mensagem
function scrollToLastMessage() {
    const lastMessage = document.querySelectorAll(".message")[numberOfMessages - 1];
    lastMessage.scrollIntoView();
    numberOfMessages = 0;
}




// ENVIAR MENSAGEM
function sendMessage() {

    let type = document.querySelector('.message-type.selected').querySelector("span").innerText
    let text = document.querySelector("#message-text");

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
    promise.catch(refresh)

    text.value = "";
}


function refresh() {
    window.location.reload()
}
// FUNÇOES DO MENU LATERAL

function selectContact(element) {
    deselect('contact');
    element.classList.add("selected");
    contactSelected = element.querySelector("span").innerText;
    console.log(contactSelected)
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