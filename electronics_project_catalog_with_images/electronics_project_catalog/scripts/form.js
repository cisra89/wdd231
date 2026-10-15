import "./main.js";

const form = document.querySelector(".suggestion-form");

if (form) {
  form.addEventListener("submit", (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      form.reportValidity();
    }
  });
}
