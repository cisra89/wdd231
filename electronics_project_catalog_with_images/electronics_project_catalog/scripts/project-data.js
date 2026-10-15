const PROJECTS_URL = new URL("../data/projects.json", import.meta.url);

export async function getProjects() {
  const response = await fetch(PROJECTS_URL);
  if (!response.ok) {
    throw new Error(`Project data request failed: ${response.status}`);
  }
  const projects = await response.json();
  if (!Array.isArray(projects) || projects.length < 15) {
    throw new Error("The project data must contain at least 15 items.");
  }
  return projects;
}

export function getFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem("electronicsFavorites") || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    console.warn("Favorites could not be read from local storage:", error);
    return [];
  }
}

export function saveFavorites(favorites) {
  try {
    localStorage.setItem("electronicsFavorites", JSON.stringify(favorites));
  } catch (error) {
    console.warn("Favorites could not be saved:", error);
  }
}

export function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}
