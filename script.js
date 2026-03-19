// L'URL de ton backend sur InfinityFree
const API_URL = "http://precieux-gi1.rf.gd/";

document.addEventListener('DOMContentLoaded', chargerEtudiants);

// 1. CHARGER LES ÉTUDIANTS
function chargerEtudiants() {
    fetch(API_URL + 'afficher_information.php')
    .then(res => res.json())
    .then(data => afficher(data))
    .catch(err => console.error("Erreur de chargement:", err));
}

// 2. AFFICHER DANS LE TABLEAU
function afficher(data) {
    const table = document.getElementById('listeEtudiants');
    if(!table) return; // Sécurité si on est sur form.html
    
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
                    <button onclick="window.location.href='modifier_information.php?id=${etudiant.id}'">Modifier</button>
                    <button class="btn-del" onclick="supprimer(${etudiant.id})">Supprimer</button>
                </td>
            </tr>`;
    });
}

// 3. SUPPRIMER UN ÉTUDIANT
function supprimer(id) {
    if(confirm("Voulez-vous vraiment supprimer cet étudiant ?")) {
        // On redirige vers le script PHP sur le serveur
        window.location.href = API_URL + 'supprimer_information.php?id=' + id;
    }
}

// 4. RECHERCHE (FILTRE JS)
function rechercher() {
    let q = document.getElementById('recherche').value.toLowerCase();
    fetch(API_URL + 'afficher_information.php')
    .then(res => res.json())
    .then(data => {
        let filtered = data.filter(e => 
            e.nom.toLowerCase().includes(q) || 
            e.filiere.toLowerCase().includes(q)
        );
        afficher(filtered);
    });
}