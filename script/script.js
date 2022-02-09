





function selectContact (element) {
    deselect('contact');
    element.classList.add("selected");
}
function selectTypeMessage(element){
    deselect('message-option');
    element.classList.add("selected");
}
function deselect (className){

    const elementSelected = document.querySelector("."+className+".selected")
    
    if(elementSelected !== null){
        elementSelected.classList.remove("selected")
    }
}