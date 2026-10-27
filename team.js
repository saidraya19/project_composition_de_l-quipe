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
    const saved_players = localStorage.getItem(key);
    return saved_players ? JSON.parse(saved_players) : initial_players;
}
let list_of_players = getitems();
const number = document.querySelector("#numberofplayer")
const  regexofnumber = /^([1-9]|[1-9][0-9])$/;
const regex_nom = /^[A-Za-zÀ-ÿ ]{3,30}$/;
const name_ = document.querySelector("#player")
const error_name = document.querySelector(".error-msg-name")
const error_number = document.querySelector(".msg-number")
const btn_sub = document.querySelector("#btn-submit")
 const gardien_chois = document.querySelectorAll(".btn-post")
btn_sub.addEventListener("click", function(){
let msg_name = "";
let number_msg = "";

const nom_valide = regex_nom.test(name_.value.trim());
const numero_valide = regexofnumber.test(number.value);

if (!nom_valide) {
    msg_name = "Veuillez saisir un nom valide.";
}

if (!numero_valide) {
    number_msg = "Numéro invalide. Veuillez saisir un numéro entre 1 et 99";
}

const number_validation = list_of_players.some(function(player) {
    return player.number === Number(number.value);
});

if (numero_valide && number_validation) {
    number_msg = "Numéro déjà utilisé";
}

error_number.textContent = number_msg;
error_name.textContent = msg_name;

if (nom_valide && numero_valide && !number_validation && post !== "") {

    const add_data = {
        name: name_.value.trim(),
        number: Number(number.value),
        post: post
    };
   const success = document.querySelector("#msg-success");
success.querySelector("p").textContent = "Player added successfully";

success.removeAttribute("hidden");

setTimeout(function() {
success.setAttribute("hidden", "");
}, 1500);


    list_of_players.push(add_data);
    document.querySelector(".length").textContent = list_of_players.length;
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
     
const all = document.querySelector(".form_general_player");
const select_template = all.querySelector(".select-group").cloneNode(true);
all.querySelector(".player-card").remove();
// hna kanakhdo ma3lomat 3la la3ib li ghan3adlo o kanakhdo variables nkhazno fih id bach nthakmo bih
let joueur_en_modification = null;
let post_edit = "";

const edit_modal = document.querySelector("#modifier");
const btn_close_edit = document.querySelector("#btn-close-edit");
const btn_cancel_edit = document.querySelector("#btn-cancel-edit");



const close_edit_buttons = edit_modal.querySelectorAll(".modifier-close-btn");

close_edit_buttons.forEach(function(btn) {
    btn.addEventListener("click", function() {
        edit_modal.setAttribute("hidden", "");
    });
});
const edit_name = document.querySelector("#edit-player");
const edit_number = document.querySelector("#edit-numberofplayer");
const edit_submit = document.querySelector("#btn-edit-submit");
const edit_error_name = document.querySelector(".edit-error-msg-name");
const edit_error_number = document.querySelector(".edit-msg-number");
const edit_post_buttons = edit_modal.querySelectorAll(".edit-btn-post");
edit_post_buttons.forEach(function(btn) {

    btn.addEventListener("click", function() {

        edit_post_buttons.forEach(function(other_btn) {
            other_btn.classList.remove("bg-[oklch(66.6%_0.179_58.318)]");
        });
        btn.classList.add("bg-[oklch(66.6%_0.179_58.318)]");
        post_edit = btn.textContent.trim();
    });
});
const colors = {
    "Gardien": "border-l-yellow-500!",
    "Défenseur": "border-l-blue-500!",
    "Milieu": "border-l-green-500!",
    "Attaquant": "border-l-red-500!"
};
const border_by_pos = {
    GB: "border-yellow-400!",
    DG: "border-blue-400!", DC1: "border-blue-400!", DC2: "border-blue-400!", DD: "border-blue-400!",
    MG: "border-green-400!", MC1: "border-green-400!", MC2: "border-green-400!", MD: "border-green-400!",
    BU1: "border-red-400!", BU2: "border-red-400!"
};
const all_box_borders = ["border-yellow-400!", "border-blue-400!", "border-green-400!", "border-red-400!"];

function colorer_joueur(container, div_number, poste) {

    const all_colors = Object.values(colors);

    container.classList.remove(...all_colors);
    div_number.classList.remove(...all_colors);

    const color = colors[poste];

    if (color) {
        container.classList.add("border-l-4!", color);
        div_number.classList.add("border-l-4!", color);
    }
}
function show(player){
        const aucun = document.querySelector("#auc");

    if (list_of_players.length === 0) {
        aucun.removeAttribute("hidden");
    } else {
        aucun.setAttribute("hidden", "");
    }
  

    const select_group = select_template.cloneNode(true);

const select = select_group.querySelector("select");
select.addEventListener("change", function() {
if (select.value === "banc") {

    if (player.position_choisie) {

        const ancienne_position = document.querySelector(
            `[data-position="${player.position_choisie}"]`
        );
        if (ancienne_position) {
            ancienne_position.querySelector("p").textContent = "Libre";
            ancienne_position.classList.remove("bg-blue-400/50!","bg-green-400/50!","bg-red-400/50!","bg-yellow-400/50!","border","border-white!", ...all_box_borders);
            ancienne_position.classList.add("border-2","border-dashed","border-white/40");
        }
    }
    player.position_choisie = "";
    return;
}
    console.log(player.name, player.number, player.position_choisie);
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
                     position.classList.add("border-2", "border", border_by_pos[select.value]);
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
                            position.classList.remove("bg-blue-400/50!","bg-green-400/50!", "bg-red-400/50!","bg-yellow-400/50!","border","border-white!", ...all_box_borders)
                            other_paragraph.textContent = "Libre";
                            position.classList.remove("bg-blue-400/50!")
                            position.classList.remove("bg-green-400/50!")
                            position.classList.remove("bg-red-400/50!")
                            position.classList.add("border-2","border-dashed","border-white/40");
                            position.classList.remove("bg-yellow-400/50!")
                           
                        }
                    })
                    paragraph.textContent = `${player.number}  ${player.name}`  
                    player.position_choisie = select.value;
                }
            }
        })
    }else{
         
                const chkon = player.name
                 const success = document.querySelector("#msg-success");
            success.removeAttribute("hedden")
             success.querySelector("p").textContent = " this player not acssus to this post"
             success.removeAttribute("hidden");
             setTimeout(function() {
                success.setAttribute("hidden", "");
            }, 1500);
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


div_name_post.append(name_row, post, select_group);
div_name_post.classList.add("player-details");
colorer_joueur(container, div_number, player.post);
remove.addEventListener("click", function() {

    const modal = document.querySelector("#modal-delete");
    const message = document.querySelector("#delete-message");

    message.textContent = `Voulez-vous supprimer ${player.name} ?`;

    modal.removeAttribute("hidden");

    document.querySelector("#cancel-delete").onclick = function() {
        modal.setAttribute("hidden", "");
    };

    document.querySelector("#confirm-delete").onclick = function() {


        if (player.position_choisie) {
            const position = document.querySelector(
                `[data-position="${player.position_choisie}"]`
            );

            if (position) {
                position.querySelector("p").textContent = "Libre";

                position.classList.remove("bg-blue-400/50!","bg-green-400/50!","bg-red-400/50!","bg-yellow-400/50!","border","border-white!", ...all_box_borders);
                position.classList.add("border-2","border-dashed","border-white/40");
            }
        }

       
        const index = list_of_players.indexOf(player);

        if (index !== -1) {
            const chkon = player.name;
            list_of_players.splice(index, 1);
            //message of remove 
            const success = document.querySelector("#msg-success");
            success.removeAttribute("hedden")
             success.querySelector("p").textContent = `${chkon} removed successfully`
             success.removeAttribute("hidden");
             setTimeout(function() {
                success.setAttribute("hidden", "");
            }, 1500);
        }
        container.remove();
        document.querySelector(".length").textContent =
            list_of_players.length;
        modal.setAttribute("hidden", "");
        setitems(list_of_players);
    };
});
edit.addEventListener("click", function() {
    joueur_en_modification = player;
    edit_name.value = player.name;
    edit_number.value = player.number;
    post_edit = player.post;
    edit_post_buttons.forEach(function(btn) {
        btn.classList.remove("bg-[oklch(66.6%_0.179_58.318)]");

        if (btn.textContent.trim() === player.post) {
            btn.classList.add("bg-[oklch(66.6%_0.179_58.318)]");
        }
    });
    
    edit_modal.removeAttribute("hidden");
});
card.append(div_name_post)
players_all.append(card)
div_parent.append(players_all)
container.append(div_parent)
all.append(container);
}
edit_submit.addEventListener("click", function() {
     if (!joueur_en_modification) {
        return;
    }
  
    const nom_valide = regex_nom.test(edit_name.value.trim());
    const numero_valide = regexofnumber.test(edit_number.value);
    const numero_utilise = list_of_players.some(function(p) {
        return p.number === Number(edit_number.value)
            && p !== joueur_en_modification;
    });
    edit_error_name.textContent = nom_valide
        ? ""
        : "Veuillez saisir un nom valide.";
    if (!numero_valide) {
        edit_error_number.textContent = "Numéro invalide. Saisissez un numéro entre 1 et 99.";
    } else if (numero_utilise) {
        edit_error_number.textContent = "Numéro déjà utilisé.";
    } else {
        edit_error_number.textContent = "";
    }
    if (!nom_valide || !numero_valide || numero_utilise || post_edit === "") {
        return;
    }

const old_number = joueur_en_modification.number;
const player_card = document.querySelector(
    `.player-card[data-player-number="${old_number}"]`
);
joueur_en_modification.name = edit_name.value.trim();
joueur_en_modification.number = Number(edit_number.value);
joueur_en_modification.post = post_edit;

    if (player_card) {

    const numero_element = player_card.querySelector(".player-number");

    colorer_joueur(
        player_card,
        numero_element,
        joueur_en_modification.post
    );

    player_card.dataset.playerNumber = joueur_en_modification.number;

    player_card.querySelector(".player-number h2").textContent =
        joueur_en_modification.number;

    player_card.querySelector(".player-details strong").textContent =
        joueur_en_modification.name;

    player_card.querySelector(".player-details p").textContent =
        joueur_en_modification.post;
}


    if (joueur_en_modification.position_choisie) {
        const position = document.querySelector(
            `[data-position="${joueur_en_modification.position_choisie}"]`
        );
        if (position) {
            position.querySelector("p").textContent =
                `${joueur_en_modification.number}  ${joueur_en_modification.name}`;
        }
    }
    setitems(list_of_players);
    edit_modal.setAttribute("hidden", "");
     const chkon = joueur_en_modification.name
    joueur_en_modification = null;
    post_edit = "";
     //message of edit
            const success = document.querySelector("#msg-success");
            success.removeAttribute("hedden")
             success.querySelector("p").textContent = `${chkon} Edited successfully`
             success.removeAttribute("hidden");
             setTimeout(function() {
                success.setAttribute("hidden", "");
            }, 1500);
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