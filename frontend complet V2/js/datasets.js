const params = new URLSearchParams(window.location.search);
const countryKey = params.get("country");

const title = document.getElementById("title");
const list = document.getElementById("datasetList");
const searchInput = document.getElementById("datasetSearch");

if (!countryKey || !DATA_CATALOG[countryKey]) {
  title.innerText = "Pays inconnu (retour accueil)";
  list.innerHTML = `<li style="cursor:default">Erreur : pays non trouvé.</li>`;
} else {
  const country = DATA_CATALOG[countryKey];
  title.innerText = `${country.label} – Données disponibles`;

  function renderDatasets(filterText = "") {
    const filter = filterText.toLowerCase().trim();
    list.innerHTML = "";

    const entries = Object.entries(country.datasets)
      .filter(([_, ds]) => {
        const hay = (ds.label + " " + (ds.description || "")).toLowerCase();
        return hay.includes(filter);
      });

    if (entries.length === 0) {
      const li = document.createElement("li");
      li.style.cursor = "default";
      li.innerHTML = `Aucune donnée trouvée.`;
      list.appendChild(li);
      return;
    }

    entries.forEach(([datasetKey, dataset]) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div><strong>${dataset.label}</strong></div>
        <div class="desc">${dataset.description || ""}</div>
      `;
      li.onclick = () => {
        // IMPORTANT : chaque dataset a sa page HTML dédiée.
        // On redirige donc vers le fichier HTML du dataset.
        window.location.href = dataset.page;
      };
      list.appendChild(li);
    });
  }

  searchInput.addEventListener("input", (e) => {
    renderDatasets(e.target.value);
  });

  renderDatasets();
}
