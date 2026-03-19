// L'URL de ton backend sur InfinityFree
const API_URL = "http://precieux-gi1.rf.gd/";

document.addEventListener('DOMContentLoaded', chargerEtudiants);

// 1. CHARGER LES ÉTUDIANTS DEPUIS LA BDD
function chargerEtudiants() {
    fetch(API_URL + 'afficher_information.php')
    .then(res => res.json())
    .then(data => afficher(data))
    .catch(err => console.error("Erreur de chargement:", err));
}

// 2. AFFICHER DANS LE TABLEAU AVEC BOUTONS
function afficher(data) {
    const tableBody = document.querySelector('#etudiants-table tbody');
    if(!tableBody) return; 
    
    tableBody.innerHTML = "";
    data.forEach(etudiant => {
        // On crée chaque ligne avec les boutons Modifier et Supprimer
        tableBody.innerHTML += `
            <tr>
                <td>${etudiant.nom}</td>
                <td>${etudiant.prenom}</td>
                <td>${etudiant.email}</td>
                <td>${etudiant.telephone}</td>
                <td>${etudiant.filiere}</td>
                <td>
                    <button class="btn-edit" onclick="modifier(${etudiant.id})">Modifier</button>
                    <button class="btn-del" onclick="supprimer(${etudiant.id})">Supprimer</button>
                </td>
            </tr>`;
    });
}

// 3. FONCTION SUPPRIMER
function supprimer(id) {
    if(confirm("Voulez-vous vraiment supprimer cet étudiant ?")) {
        fetch(API_URL + 'supprimer_information.php?id=' + id)
        .then(() => {
            alert("Étudiant supprimé avec succès !");
            chargerEtudiants(); // Recharge la liste sans rafraîchir la page
        })
        .catch(err => console.error("Erreur lors de la suppression:", err));
    }
}

// 4. FONCTION MODIFIER (Redirection vers une page d'édition)
function modifier(id) {
    window.location.href = `modifier.html?id=${id}`;
}
