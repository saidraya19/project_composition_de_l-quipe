const btnajouter = document.querySelectorAll(".ajout-btn")
const formajout = document.querySelector("#ajout")
btnajouter.forEach(function(btn){
btn.addEventListener("click", function(){
formajout.toggleAttribute("hidden")
});
});
const number = document.querySelector("#numberofplayer")
const  regexofnumber = /^([1-9]|[1-9][0-9])$/;
let number_msg = "";
if(!regexofnumber.test(number.value))
{
 number_msg = "Numéro invalide. Veuillez saisir un numéro entre 1 et 99";
}
const regexNom = /^[A-Za-zÀ-ÿ ]{3,30}$/;
const name_ = document.querySelector("#player")
const error_name = document.querySelector(".error-msg-name")
const error_number = document.querySelector(".msg-number")
let msg_name = "";
if(!regexNom.test(name_.value))
{
    msg_name = "Veuillez saisir un nom valide."
}
const btn_sub = document.querySelector("#btn-submit")
btn_sub.addEventListener("click", function(){
    error_name.textContent = msg_name;
    error_number.textContent = number_msg;
})
