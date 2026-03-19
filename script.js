const API_URL = "http://precieux-gi1.rf.gd/";

document.addEventListener('DOMContentLoaded', charger);

function charger() {
    fetch(API_URL + 'afficher_information.php')
    .then(r => r.json())
    .then(data => {
        const t = document.getElementById('listeEtudiants');
        t.innerHTML = "";
        data.forEach(e => {
            t.innerHTML += `<tr>
                <td>${e.nom}</td><td>${e.prenom}</td><td>${e.email}</td>
                <td>${e.telephone}</td><td>${e.filiere}</td>
                <td><button onclick="suppr(${e.id})" style="color:red">Supprimer</button></td>
            </tr>`;
        });
    }).catch(err => alert("Erreur : Activez le 'Contenu non sécurisé' dans votre navigateur"));
}

function suppr(id) {
    if(confirm("Supprimer ?")) {
        fetch(API_URL + 'supprimer_information.php?id=' + id).then(() => charger());
    }
}
