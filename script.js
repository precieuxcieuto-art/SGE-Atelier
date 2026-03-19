const API_URL = "http://precieux-gi1.rf.gd/";

document.addEventListener('DOMContentLoaded', chargerEtudiants);

function chargerEtudiants() {
    fetch(API_URL + 'afficher_information.php')
    .then(res => res.json())
    .then(data => {
        const table = document.getElementById('listeEtudiants');
        if(!table) return;
        
        table.innerHTML = "";
        data.forEach(etudiant => {
            table.innerHTML += `
                <tr>
                    <td>${etudiant.nom}</td>
                    <td>${etudiant.prenom}</td>
                    <td>${etudiant.email}</td>
                    <td>${etudiant.telephone}</td>
                    <td>${etudiant.filiere}</td>
                    <td>
                        <button style="background: #2ecc71; color: white; border: none; padding: 5px; cursor: pointer;" onclick="modifier(${etudiant.id})">Modifier</button>
                        <button style="background: #e74c3c; color: white; border: none; padding: 5px; cursor: pointer;" onclick="supprimer(${etudiant.id})">Supprimer</button>
                    </td>
                </tr>`;
        });
    })
    .catch(err => console.error("Erreur:", err));
}

function supprimer(id) {
    if(confirm("Supprimer cet étudiant ?")) {
        fetch(API_URL + 'supprimer_information.php?id=' + id)
        .then(() => {
            alert("Supprimé !");
            chargerEtudiants();
        });
    }
}

function modifier(id) {
    alert("Fonction modifier pour l'ID " + id + " à implémenter bientôt !");
}
