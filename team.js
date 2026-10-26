 let initial_players = [
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
    { name: "Cristiano Ronaldo", number: 9, post: "Attaquant" },
    { name: "Cristiano", number: 20, post: "Milieu"}
];
const btnajouter = document.querySelectorAll(".ajout-btn")
const formajout = document.querySelector("#ajout")
btnajouter.forEach(function(btn){
btn.addEventListener("click", function(){
formajout.toggleAttribute("hidden")
});
});
const key ="my_key";
function setitems(users){
     localStorage.setItem(key, JSON.stringify(users));
}
function getitems() {
    const savedPlayers = localStorage.getItem(key);
    return savedPlayers ? JSON.parse(savedPlayers) : initial_players;
}
let list_of_players = getitems();
const number = document.querySelector("#numberofplayer")
const  regexofnumber = /^([1-9]|[1-9][0-9])$/;
const regexNom = /^[A-Za-zÀ-ÿ ]{3,30}$/;
const name_ = document.querySelector("#player")
const error_name = document.querySelector(".error-msg-name")
const error_number = document.querySelector(".msg-number")
const btn_sub = document.querySelector("#btn-submit")
 const gardien_chois = document.querySelectorAll(".btn-post")
btn_sub.addEventListener("click", function(){
let msg_name = "";
let number_msg = "";

const nomValide = regexNom.test(name_.value.trim());
const numeroValide = regexofnumber.test(number.value);

if (!nomValide) {
    msg_name = "Veuillez saisir un nom valide.";
}

if (!numeroValide) {
    number_msg = "Numéro invalide. Veuillez saisir un numéro entre 1 et 99";
}

const number_validation = list_of_players.some(function(player) {
    return player.number === Number(number.value);
});

if (numeroValide && number_validation) {
    number_msg = "Numéro déjà utilisé";
}

error_number.textContent = number_msg;
error_name.textContent = msg_name;

if (nomValide && numeroValide && !number_validation && post !== "") {

    const add_data = {
        name: name_.value.trim(),
        number: Number(number.value),
        post: post
    };

    list_of_players.push(add_data);
    setitems(list_of_players);

    show(add_data);

    formajout.toggleAttribute("hidden");

    console.log(add_data);
    console.log(list_of_players);
}

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
        let post = "";
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
     
/* kanjibo select nakhdo mnha noskha*/
const all = document.querySelector(".form_general_player");
const selectTemplate = all.querySelector(".select-group").cloneNode(true);
all.querySelector(".player-card").remove();
let joueurEnModification = null;
let postEdit = "";

const editModal = document.querySelector("#modifier");
const editName = document.querySelector("#edit-player");
const editNumber = document.querySelector("#edit-numberofplayer");
const editSubmit = document.querySelector("#btn-edit-submit");
const editErrorName = document.querySelector(".edit-error-msg-name");
const editErrorNumber = document.querySelector(".edit-msg-number");
const editPostButtons = editModal.querySelectorAll(".edit-btn-post");
editPostButtons.forEach(function(btn) {

    btn.addEventListener("click", function() {

        editPostButtons.forEach(function(otherBtn) {
            otherBtn.classList.remove("bg-[oklch(66.6%_0.179_58.318)]");
        });

        btn.classList.add("bg-[oklch(66.6%_0.179_58.318)]");
        postEdit = btn.textContent.trim();

    });

});
function show(player){
    const selectGroup = selectTemplate.cloneNode(true);

const select = selectGroup.querySelector("select");
select.addEventListener("change", function() {
if (select.value === "banc") {

    if (player.positionChoisie) {

        const anciennePosition = document.querySelector(
            `[data-position="${player.positionChoisie}"]`
        );
        if (anciennePosition) {
            anciennePosition.querySelector("p").textContent = "Libre";
            anciennePosition.classList.remove("bg-blue-400/50!","bg-green-400/50!","bg-red-400/50!","bg-yellow-400/50!","border","border-white!");
            anciennePosition.classList.add("border-2","border-dashed","border-white/40");
        }
    }
    player.positionChoisie = "";
    return;
}

    const have_post = posible_posts[player.post].includes(select.value)
 
    if(have_post)
    {
        const positions = document.querySelectorAll("[data-position]")
        positions.forEach(function(position){
            if(position.dataset.position === select.value)
            {
                const paragraph = position.querySelector("p");
                if(paragraph.textContent.trim() === "Libre")
                {
                     position.classList.add("border-2", "border", "border-white!");
                 position.classList.remove("border-dashed", "border-white/40");
                    if(select.value.trim() === "GB")
                {
                    position.classList.add("bg-yellow-400/50!")
                }
                else if(select.value.trim() === "DG" || select.value.trim() === "DC1" || select.value.trim() === "DC2" || select.value.trim() === "DD"){
                    position.classList.add("bg-blue-400/50!")
                }
                else if(select.value.trim() === "MG" || select.value.trim() === "MC1" || select.value.trim() === "MC2" || select.value.trim() === "MD"){
                     position.classList.add("bg-green-400/50!")
                }
                else if(select.value.trim() === "BU1" || select.value.trim() === "BU2")
                {
                    position.classList.add("bg-red-400/50!")
                }
                    positions.forEach(function(position){
                        const other_paragraph = position.querySelector("p")

                        if(select.value.trim() === "Sur le banc" || other_paragraph.textContent.trim() === `${player.number}  ${player.name}`)
                        {
                            position.classList.remove("bg-blue-400/50!","bg-green-400/50!", "bg-red-400/50!","bg-yellow-400/50!","border","border-white!")
                            other_paragraph.textContent = "Libre";
                            position.classList.remove("bg-blue-400/50!")
                            position.classList.remove("bg-green-400/50!")
                            position.classList.remove("bg-red-400/50!")
                            position.classList.add("border-2","border-dashed","border-white/40");
                            position.classList.remove("bg-yellow-400/50!")
                           
                        }
                    })
                    paragraph.textContent = `${player.number}  ${player.name}`  
                    player.positionChoisie = select.value;
                }
            }
        })
    }

});

 const all = document.querySelector(".form_general_player")
const container = document.createElement("div")
container.dataset.playerNumber = player.number;
container.classList.add("player-card");
container.dataset.playerNumber = player.number;
    const div_parent = document.createElement("div")
    div_parent.classList.add("player-info")
const players_all = document.createElement("div")

const card = document.createElement("div")
card.classList.add("flex", "gap-6")
const div_number = document.createElement("div")
const nmb = document.createElement("h2")
nmb.textContent = player.number;
div_number.append(nmb);
div_number.classList.add("player-number")
card.append(div_number)
const div_name_post = document.createElement("div")
const nom = document.createElement("strong")
const post = document.createElement("p")
post.textContent = player.post;
nom.textContent = player.name;

const edit = document.createElement("button");
edit.type = "button";
edit.textContent = "✏️";
edit.classList.add("cursor-pointer");


const remove = document.createElement("button");
remove.type = "button";
remove.innerHTML = '<i class="fa-solid fa-trash"></i>';
remove.classList.add("cursor-pointer" ,"hover:text-red-500", "transition-colors");

const name_row = document.createElement("div");
name_row.classList.add("flex", "items-center", "gap-2");

name_row.append(nom, edit, remove);


div_name_post.append(name_row, post, selectGroup);
div_name_post.classList.add("player-details");
remove.addEventListener("click", function() {

    const modal = document.querySelector("#modal-delete");
    const message = document.querySelector("#delete-message");

    message.textContent = `Voulez-vous supprimer ${player.name} ?`;

    modal.removeAttribute("hidden");

    document.querySelector("#cancel-delete").onclick = function() {
        modal.setAttribute("hidden", "");
    };

    document.querySelector("#confirm-delete").onclick = function() {


        if (player.positionChoisie) {
            const position = document.querySelector(
                `[data-position="${player.positionChoisie}"]`
            );

            if (position) {
                position.querySelector("p").textContent = "Libre";

                position.classList.remove("bg-blue-400/50!","bg-green-400/50!","bg-red-400/50!","bg-yellow-400/50!","border","border-white!");
                position.classList.add("border-2","border-dashed","border-white/40");
            }
        }

       
        const index = list_of_players.indexOf(player);

        if (index !== -1) {
            list_of_players.splice(index, 1);
        }
        container.remove();
        document.querySelector(".length").textContent =
            list_of_players.length;
        modal.setAttribute("hidden", "");
        setitems(list_of_players);
    };
});
edit.addEventListener("click", function() {
    joueurEnModification = player;
    editName.value = player.name;
    editNumber.value = player.number;
    postEdit = player.post;
    editPostButtons.forEach(function(btn) {
        btn.classList.remove("bg-[oklch(66.6%_0.179_58.318)]");

        if (btn.textContent.trim() === player.post) {
            btn.classList.add("bg-[oklch(66.6%_0.179_58.318)]");
        }
    });
    
    editModal.removeAttribute("hidden");
});
card.append(div_name_post)
players_all.append(card)
div_parent.append(players_all)
container.append(div_parent)
all.append(container);
}
editSubmit.addEventListener("click", function() {
    if (!joueurEnModification) {
        return;
    }
    const nomValide = regexNom.test(editName.value.trim());
    const numeroValide = regexofnumber.test(editNumber.value);
    const numeroUtilise = list_of_players.some(function(p) {
        return p.number === Number(editNumber.value)
            && p !== joueurEnModification;
    });
    editErrorName.textContent = nomValide
        ? ""
        : "Veuillez saisir un nom valide.";
    if (!numeroValide) {
        editErrorNumber.textContent = "Numéro invalide. Saisissez un numéro entre 1 et 99.";
    } else if (numeroUtilise) {
        editErrorNumber.textContent = "Numéro déjà utilisé.";
    } else {
        editErrorNumber.textContent = "";
    }
    if (!nomValide || !numeroValide || numeroUtilise || postEdit === "") {
        return;
    }

const oldNumber = joueurEnModification.number;
const playerCard = document.querySelector(
    `.player-card[data-player-number="${oldNumber}"]`
);
joueurEnModification.name = editName.value.trim();
joueurEnModification.number = Number(editNumber.value);
joueurEnModification.post = postEdit;

    if (playerCard) {
       playerCard.dataset.playerNumber = joueurEnModification.number;
       
        playerCard.querySelector(".player-number h2").textContent =joueurEnModification.number;

        playerCard.querySelector(".player-details strong").textContent =
            joueurEnModification.name;

        playerCard.querySelector(".player-details p").textContent =
            joueurEnModification.post;
    }


    if (joueurEnModification.positionChoisie) {
        const position = document.querySelector(
            `[data-position="${joueurEnModification.positionChoisie}"]`
        );
        if (position) {
            position.querySelector("p").textContent =
                `${joueurEnModification.number}  ${joueurEnModification.name}`;
        }
    }
    setitems(list_of_players);
    editModal.setAttribute("hidden", "");
    joueurEnModification = null;
    postEdit = "";
});

for(const player of list_of_players)
{
    show(player);
}
let len = document.querySelector(".length")
len.textContent = list_of_players.length;

const posible_posts = {
     "Gardien": ["GB"],
    "Défenseur": ["DG", "DC1", "DC2", "DD"],
    "Milieu": ["MG", "MC1", "MC2", "MD"],
    "Attaquant": ["BU1", "BU2"]
};
