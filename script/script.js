let userName = {
    name: ""
};

function login() {
    userName.name = document.querySelector(".username").value
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", userName)  
    console.log(promise)  
    promise.then(loginSucess)
    promise.catch(loginFailure)



}

function loginSucess() {
    let loginScreen = document.querySelector(".login-screen")
    loginScreen.classList.add("hidden")

}
function loginFailure(){
    alert("Nome de usuario ja existente")
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