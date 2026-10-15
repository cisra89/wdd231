import "./main.js";

const summary = document.querySelector("#submission-summary");
const params = new URLSearchParams(window.location.search);
const fields = [
  ["First name", "firstName"],
  ["Last name", "lastName"],
  ["Email", "email"],
  ["Project name", "projectName"],
  ["Category", "category"],
  ["Difficulty", "difficulty"],
  ["Learning goal", "description"],
  ["Suggested components", "components"]
];

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

const hasSubmission = fields.some(([, key]) => params.has(key));

if (!hasSubmission) {
  summary.innerHTML = "<p>No form data was found. Please submit the suggestion form first.</p><a class=\"text-link\" href=\"form.html\">Open the suggestion form</a>";
} else {
  summary.innerHTML = `
    <h2>Submitted information</h2>
    <dl class="summary-list">
      ${fields.map(([label, key]) => `<div><dt>${label}</dt><dd>${escapeHTML(params.get(key) || "Not provided")}</dd></div>`).join("")}
    </dl>
  `;
}
