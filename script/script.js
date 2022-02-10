const messagesDisplay = document.querySelector(".messages")

let messagesList = "";




let userName = {
    name: ""
};

function login() {
    userName.name = document.querySelector(".username").value
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", userName)  

    promise.then(loginSucess)
    promise.catch(loginFailure)


}

function loginSucess() {
    let loginScreen = document.querySelector(".login-screen")
    loginScreen.classList.add("hidden")
    setInterval(sendStatus, 5000);
    setInterval(searchMessages, 3000)
    setInterval(scrollToLastMessage,3200)
}
function loginFailure(){
    alert("Nome de usuario ja existente")
}


function sendStatus (){
    axios.post("https://mock-api.driven.com.br/api/v4/uol/status",userName)
}


function searchMessages(){
    messagesList = ""
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages")
    promise.then(insertMessages)
}
function insertMessages(response){
    response.data.forEach(element => {
       compareStatus(element);
       messagesDisplay.innerHTML = messagesList;
    });
}
function compareStatus (element){
    if(element.type === "status"){
        messagesList += `<li class="message status">
        <span>${element.time}</span>
        <p><strong>${element.from}</strong> ${element.text}</p>
    </li>`
    }else if(element.type === "message"){
        messagesList += `<li class="message all">
            <span>${element.time}</span>
            <p><strong>${element.from}</strong> para <strong>${element.to}</strong>: ${element.text}</p>
        </li>`
    }else if(element.type === "private_message"){
        if(element.from == userName){
            messagesList +=`<li class="message private">
            <span>${element.time}</span>
            <p><strong>${element.from}</strong> reservadamente para <strong>${element.to}</strong>: ${element.text}</p>
        </li>`
        }
    }
}

function scrollToLastMessage (){
    const lastMessage = document.querySelectorAll(".message")[99];
    lastMessage.scrollIntoView();
}

// ENVIAR MENSAGEM

function sendMessage() {

    
    let type = document.querySelector('.message-type.selected').querySelector("span").innerText
    if(type == "Público"){
        type = "message";
    }else{
        type = "private_message"
    }

    let message = {
        from: userName.name,
        to: document.querySelector('.contact.selected').querySelector("span").innerText,
        text: document.querySelector("#message-text").value,
        type: type

    }
    console.log(message)

    



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