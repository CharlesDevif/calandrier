/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
import { IUser } from '../../interfaces/user';
const { ipcRenderer } = require('electron');

(async () => {
    const prenom = document.getElementById('prenom') as HTMLInputElement
    const nom = document.getElementById('nom') as HTMLInputElement
    const form = document.querySelector('form')
    const table = document.getElementById('users')
    const btnOpen = document.getElementById('btnOpen')

    let users: IUser[] = []


    users = await ipcRenderer.invoke('bdd-get-all') as IUser[]

    // const users = await getAll()
    // console.log(users);

    if (form && nom && prenom && btnOpen) {
        btnOpen.addEventListener('click', () => {
            ipcRenderer.invoke('open')
        })
        form.addEventListener('submit', (e: Event) => {
            e.preventDefault()
            const newUser: IUser = {
                nom: nom.value,
                prenom: prenom.value
            }
            ajouterPersonne(newUser)

        })
        afficheTableau()
    }

    async function ajouterPersonne(p: IUser) {
        // const derUser = (users.length > 0) ? users[users.length - 1] : { id: 0, prenom: "", nom: "" }
        // let newId = (derUser && derUser.id) ? derUser.id + 1 : 1
        // users.push({ ...p, id: newId })
        await ipcRenderer.invoke('bdd-add-user', p)
        prenom.value = ""
        nom.value = ""
        afficheTableau()
    }

    async function afficheTableau() {
        if (table) {
            table.innerHTML = ""
            users = await ipcRenderer.invoke('bdd-get-all') as IUser[]

            users.forEach(u => {
                const ligne = document.createElement('tr')
                const idLig = document.createElement('td')
                const prenomLig = document.createElement('td')
                const nomLig = document.createElement('td')
                const optionLig = document.createElement('td')
                const btnSupp = document.createElement('button')
                idLig.innerText = (u.id) ? u.id.toString() : "0"
                prenomLig.innerText = u.prenom
                nomLig.innerText = u.nom
                btnSupp.innerText = "supprimer"
                btnSupp.addEventListener('click', () => {
                    suppUser((u.id) ? u.id : 0)
                })

                optionLig.appendChild(btnSupp)
                ligne.appendChild(idLig)
                ligne.appendChild(prenomLig)
                ligne.appendChild(nomLig)
                ligne.appendChild(optionLig)
                table.appendChild(ligne)
            })
        }
    }

    async function suppUser(id: number) {
        // const index = users.findIndex(e => e.id === id)
        // // console.log(index);

        // if (index > -1) {
        //     users.splice(index, 1)
        // }
        await ipcRenderer.invoke('bdd-del-user', id)
        afficheTableau()
    }
})()

