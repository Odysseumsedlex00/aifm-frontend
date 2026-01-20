const list = document.getElementById("countryList");
const searchInput = document.getElementById("countrySearch");

function renderCountries(filterText = "") {
  const filter = filterText.toLowerCase().trim();
  list.innerHTML = "";

  const entries = Object.entries(DATA_CATALOG)
    .filter(([_, country]) => country.label.toLowerCase().includes(filter));

  if (entries.length === 0) {
    const li = document.createElement("li");
    li.style.cursor = "default";
    li.innerHTML = `Aucun pays trouvé.`;
    list.appendChild(li);
    return;
  }

  entries.forEach(([countryKey, country]) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div><strong>${country.label}</strong></div>
      <div class="small">Cliquer pour voir les données disponibles</div>
    `;
    li.onclick = () => {
      // On passe le pays dans l'URL pour que datasets.html sache quoi afficher
      window.location.href = `datasets.html?country=${encodeURIComponent(countryKey)}`;
    };
    list.appendChild(li);
  });
}

// Filtre en tapant
searchInput.addEventListener("input", (e) => {
  renderCountries(e.target.value);
});

// Affichage initial
renderCountries();
