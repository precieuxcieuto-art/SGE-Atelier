const API_URL = "http://precieux-gi1.rf.gd/";

document.addEventListener('DOMContentLoaded', charger);

function charger() {
    fetch(API_URL + 'afficher_information.php')
    .then(r => r.json())
    .then(data => {
        const t = document.getElementById('listeEtudiants');
        t.innerHTML = "";
        
        data.forEach(e => {
            t.innerHTML += `
                <tr>
                    <td>
                        <div style="font-weight:600;">${e.nom}</div>
                        <div style="font-size:0.8rem; color:gray;">${e.prenom}</div>
                    </td>
                    <td>
                        <div>${e.email}</div>
                        <div style="font-size:0.8rem; color:#70a1ff;">${e.telephone}</div>
                    </td>
                    <td>
                        <span style="background:#e3f2fd; color:#1976d2; padding:4px 10px; border-radius:20px; font-size:0.8rem; font-weight:bold;">
                            ${e.filiere}
                        </span>
                    </td>
                    <td style="text-align:right;">
                        <button onclick="suppr(${e.id})" style="background:none; border:none; color:#ff4757; cursor:pointer; font-weight:bold;">
                            Supprimer
                        </button>
                    </td>
                </tr>`;
        });
    });
}
