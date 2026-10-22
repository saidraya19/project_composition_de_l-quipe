const btnajouter = document.querySelectorAll(".ajout-btn")
const formajout = document.querySelector("#ajout")
btnajouter.forEach(function(btn){
btn.addEventListener("click", function(){
formajout.toggleAttribute("hidden")
});
});
const number = document.querySelector("#numberofplayer")
const  regexofnumber = /^([1-9]|[1-9][0-9])$/;
const regexNom = /^[A-Za-zÀ-ÿ ]{3,30}$/;
const name_ = document.querySelector("#player")
const error_name = document.querySelector(".error-msg-name")
const error_number = document.querySelector(".msg-number")
const btn_sub = document.querySelector("#btn-submit")
btn_sub.addEventListener("click", function(){
let msg_name = "";
let number_msg = "";
if(!regexNom.test(name_.value))
{
    msg_name = "Veuillez saisir un nom valide."
}
if(!regexofnumber.test(number.value))
{
 number_msg = "Numéro invalide. Veuillez saisir un numéro entre 1 et 99";
}
const btn_sub = document.querySelector("#btn-submit")

         error_number.textContent = number_msg;
         error_name.textContent = msg_name;
         if(error_number.textContent.trim() === "" && error_name.textContent.trim() === "" )
         {
             name_.classList.remove("border-red-400");
              number.classList.remove("border-red-400");
            number.classList.add("border-green-400")
            name_.classList.add("border-green-400")
         }
         else{
         if(error_number.textContent.trim() === ""){
            number.classList.remove("border-red-400");
            number.classList.add("border-green-400")
            
         }
         else { number.classList.remove("border-green-400")
             number.classList.add("border-red-400")
         }
         if(error_name.textContent.trim() === "")
         {
            name_.classList.remove("border-red-400");
            name_.classList.add("border-green-400")
         }
         else { name_.classList.remove("border-green-400")
             name_.classList.add("border-red-400")
         }  
        }      
        })
         let post = ""
        const gardien_chois = document.querySelectorAll(".btn-post")
       

        gardien_chois.forEach(function(even){

            even.addEventListener("click", function(){

                gardien_chois.forEach(function(btn){

                    btn.classList.remove("bg-[oklch(66.6%_0.179_58.318)]")
                })
                even.classList.add("bg-[oklch(66.6%_0.179_58.318)]")
            post = even.textContent.trim();
            console.log(even.textContent.trim())
                
            });
        })
      const list_of_players = [
    { name: "Thibaut Courtois", number: 1, post: "Gardien" },
    { name: "Achraf Hakimi", number: 2, post: "Défenseur" },
    { name: "Sergio Ramos", number: 4, post: "Défenseur" },
    { name: "Virgil van Dijk", number: 5, post: "Défenseur" },
    { name: "Marcelo", number: 12, post: "Défenseur" },
    { name: "Luka Modrić", number: 10, post: "Milieu" },
    { name: "Kevin De Bruyne", number: 17, post: "Milieu" },
    { name: "Jude Bellingham", number: 22, post: "Milieu" },
    { name: "Lionel Messi", number: 30, post: "Attaquant" },
    { name: "Kylian Mbappé", number: 7, post: "Attaquant" },
    { name: "Cristiano Ronaldo", number: 9, post: "Attaquant" }
];

