const API_URL = "http://precieux-gi1.rf.gd/"; // Garde bien http ici
document.addEventListener('DOMContentLoaded', function() {
    console.log("Page chargée, tentative de récupération...");
    chargerEtudiants();
});

function chargerEtudiants() {
    fetch(API_URL + 'afficher_information.php')
    .then(res => {
        if (!res.ok) throw new Error("Erreur serveur : " + res.status);
        return res.json();
    })
    .then(data => {
        console.log("Données reçues :", data);
        const tableBody = document.getElementById('listeEtudiants');
        
        if (!tableBody) {
            alert("Erreur : L'élément 'listeEtudiants' n'existe pas dans index.html");
            return;
        }

        tableBody.innerHTML = "";

        if (data.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='6'>Aucun étudiant trouvé.</td></tr>";
            return;
        }

        data.forEach(etudiant => {
            // J'utilise des noms de colonnes standards (nom, prenom, etc.)
            tableBody.innerHTML += `
                <tr>
                    <td>${etudiant.nom || 'N/A'}</td>
                    <td>${etudiant.prenom || 'N/A'}</td>
                    <td>${etudiant.email || 'N/A'}</td>
                    <td>${etudiant.telephone || 'N/A'}</td>
                    <td>${etudiant.filiere || 'N/A'}</td>
                    <td>
                        <button style="background:red; color:white;" onclick="supprimer(${etudiant.id})">Supprimer</button>
                    </td>
                </tr>`;
        });
    })
    .catch(err => {
        console.error("Erreur de fetch :", err);
        alert("Impossible de charger les données. Vérifie la console (F12).");
    });
}

function supprimer(id) {
    if(confirm("Supprimer ?")) {
        fetch(API_URL + 'supprimer_information.php?id=' + id)
        .then(() => chargerEtudiants());
    }
}
