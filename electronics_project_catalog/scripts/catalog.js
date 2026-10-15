import { getProjects, getFavorites, saveFavorites, escapeHTML } from "./project-data.js";

const grid = document.querySelector("#catalog-grid");
const searchInput = document.querySelector("#project-search");
const categoryFilter = document.querySelector("#category-filter");
const difficultyFilter = document.querySelector("#difficulty-filter");
const favoritesOnly = document.querySelector("#favorites-only");
const resultsCount = document.querySelector("#results-count");
const errorMessage = document.querySelector("#catalog-error");
const dialog = document.querySelector("#project-dialog");
const dialogContent = document.querySelector("#dialog-content");
const dialogClose = document.querySelector("#dialog-close");

let projects = [];
let favorites = getFavorites();

function renderProjects() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;
  const selectedDifficulty = difficultyFilter.value;

  const filteredProjects = projects.filter((project) => {
    const searchableText = `${project.name} ${project.category} ${project.description} ${project.components.join(" ")}`.toLowerCase();
    const matchesSearch = searchableText.includes(searchTerm);
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "all" || project.difficulty === selectedDifficulty;
    const matchesFavorite = !favoritesOnly.checked || favorites.includes(project.id);
    return matchesSearch && matchesCategory && matchesDifficulty && matchesFavorite;
  });

  resultsCount.textContent = `${filteredProjects.length} of ${projects.length} projects shown`;
  if (filteredProjects.length === 0) {
    grid.innerHTML = '<p class="loading-message">No projects match those filters. Try changing your search.</p>';
    return;
  }

  grid.innerHTML = filteredProjects.map((project) => `
    <article class="project-card">
      <h2>${escapeHTML(project.name)}</h2>
      <div class="project-meta">
        <span class="pill">${escapeHTML(project.category)}</span>
        <span class="pill">${escapeHTML(project.difficulty)}</span>
        <span class="pill">${escapeHTML(project.time)}</span>
      </div>
      <p class="project-description">${escapeHTML(project.description)}</p>
      <p><strong>Parts:</strong> ${project.components.slice(0, 3).map(escapeHTML).join(", ")}${project.components.length > 3 ? "…" : ""}</p>
      <div class="project-card-actions">
        <button class="small-button details-button" type="button" data-project-id="${escapeHTML(project.id)}">View details</button>
        <button class="small-button favorite-button" type="button" data-favorite-id="${escapeHTML(project.id)}" aria-pressed="${favorites.includes(project.id)}">${favorites.includes(project.id) ? "★ Saved" : "☆ Save"}</button>
      </div>
    </article>
  `).join("");
}

function showProjectDetails(projectId) {
  const project = projects.find((item) => item.id === projectId);
  if (!project) return;

  dialogContent.innerHTML = `
    <h2 id="dialog-title">${escapeHTML(project.name)}</h2>
    <div class="project-meta"><span class="pill">${escapeHTML(project.category)}</span><span class="pill">${escapeHTML(project.difficulty)}</span><span class="pill">${escapeHTML(project.time)}</span></div>
    <p>${escapeHTML(project.description)}</p>
    <h3>Suggested components</h3>
    <ul class="dialog-details">${project.components.map((part) => `<li>${escapeHTML(part)}</li>`).join("")}</ul>
    <h3>Safety reminder</h3><p>${escapeHTML(project.safety)}</p>
  `;
  dialog.showModal();
}

grid.addEventListener("click", (event) => {
  const detailsButton = event.target.closest("[data-project-id]");
  const favoriteButton = event.target.closest("[data-favorite-id]");

  if (detailsButton) showProjectDetails(detailsButton.dataset.projectId);

  if (favoriteButton) {
    const projectId = favoriteButton.dataset.favoriteId;
    favorites = favorites.includes(projectId)
      ? favorites.filter((id) => id !== projectId)
      : [...favorites, projectId];
    saveFavorites(favorites);
    renderProjects();
  }
});

[searchInput, categoryFilter, difficultyFilter, favoritesOnly].forEach((control) => {
  control.addEventListener("input", renderProjects);
  control.addEventListener("change", renderProjects);
});

dialogClose.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

try {
  projects = await getProjects();
  const categories = [...new Set(projects.map((project) => project.category))].sort();
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.append(option);
  });
  renderProjects();
} catch (error) {
  console.error("Could not load projects:", error);
  grid.hidden = true;
  errorMessage.hidden = false;
  resultsCount.textContent = "Project data is unavailable.";
}
