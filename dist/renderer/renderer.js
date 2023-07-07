"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../model/index");
(async () => {
    const prenom = document.getElementById('prenom');
    const nom = document.getElementById('nom');
    const form = document.querySelector('form');
    const table = document.getElementById('users');
    let users = await (0, index_1.getAll)();
    // const users = await getAll()
    // console.log(users);
    if (form && nom && prenom) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const newUser = {
                nom: nom.value,
                prenom: prenom.value
            };
            ajouterPersonne(newUser);
        });
        afficheTableau();
    }
    async function ajouterPersonne(p) {
        // const derUser = (users.length > 0) ? users[users.length - 1] : { id: 0, prenom: "", nom: "" }
        // let newId = (derUser && derUser.id) ? derUser.id + 1 : 1
        // users.push({ ...p, id: newId })
        await (0, index_1.addUser)(p);
        prenom.value = "";
        nom.value = "";
        afficheTableau();
    }
    async function afficheTableau() {
        if (table) {
            table.innerHTML = "";
            users = await (0, index_1.getAll)();
            users.forEach(u => {
                const ligne = document.createElement('tr');
                const idLig = document.createElement('td');
                const prenomLig = document.createElement('td');
                const nomLig = document.createElement('td');
                const optionLig = document.createElement('td');
                const btnSupp = document.createElement('button');
                idLig.innerText = (u.id) ? u.id.toString() : "0";
                prenomLig.innerText = u.prenom;
                nomLig.innerText = u.nom;
                btnSupp.innerText = "supprimer";
                btnSupp.addEventListener('click', () => {
                    suppUser((u.id) ? u.id : 0);
                });
                optionLig.appendChild(btnSupp);
                ligne.appendChild(idLig);
                ligne.appendChild(prenomLig);
                ligne.appendChild(nomLig);
                ligne.appendChild(optionLig);
                table.appendChild(ligne);
            });
        }
    }
    async function suppUser(id) {
        // const index = users.findIndex(e => e.id === id)
        // // console.log(index);
        // if (index > -1) {
        //     users.splice(index, 1)
        // }
        await (0, index_1.delUser)(id);
        afficheTableau();
    }
})();
