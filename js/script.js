'use strict';
const d = document;
const $root = d.getElementById('root');
if ($root) {
    console.log("El div #root existe.");
} else {
    console.error("El div #root no se encuentra.");
}

let cards = `<div class="d-flex flex-wrap">`;

fetch('file.json')
  .then((res) => {
    if (!res.ok) throw new Error(`Error al cargar el archivo JSON: ${res.status}`);
    return res.json();
  })
  .then((info) => {
    for (let i = 0; i < info.length; i++) {
      let githubLink = info[i].usernameGithub ? `https://github.com/${info[i].usernameGithub}` : '#';
      let githubImg = info[i].usernameGithub ? `https://github.com/${info[i].usernameGithub}.png` : 'default-profile.png';


      let bit1Project = info[i].projects.find(p => p.name === "bit-1");

      let bit1ModifiedScore = bit1Project && bit1Project.score.length > 0
        ? (bit1Project.score.reduce((acc, val) => acc + val, 0) / 2).toFixed(2)
        : "Sin calificaciones";

      let score = info[i].projects.map(p => `
        <p>Proyecto: ${p.name} - Calificación: ${
          p.name === "bit-1" ? bit1ModifiedScore : p.score.join(', ')
        }</p>
      `).join('');

      cards += `
        <div class="card">
          <img src="${githubImg}" class="fotos card-img-top" alt="Imagen de perfil de ${info[i].student}">
          <div class="card-body">
            <h5 class="card-title">${info[i].student}</h5>
            ${score}
          </div>
          <div class="card-body">
            <a href="${githubLink}" target="_blank" rel="noopener noreferrer" class="card-link">GitHub</a>
          </div>
        </div>
      `;
    }
    cards += '</div>';

    if ($root) {
      $root.innerHTML += cards;
    }
  })
  .catch((err) => {
    console.error('Error en la carga de datos:', err);
  });

  