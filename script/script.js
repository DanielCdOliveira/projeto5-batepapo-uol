

function login() {
    let userName = document.querySelector(".username").value
    let loginScreen = document.querySelector(".login-screen")
    loginScreen.classList.add("hidden")
}












// FUNÇOES DO MENU LATERAL

function selectContact(element) {
    deselect('contact');
    element.classList.add("selected");
}

function selectTypeMessage(element) {
    deselect('message-option');
    element.classList.add("selected");
}

function deselect(className) {

    const elementSelected = document.querySelector("." + className + ".selected")

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