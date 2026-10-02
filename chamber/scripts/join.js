const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});


/* CURRENT YEAR */

document.querySelector("#currentyear").textContent =
    new Date().getFullYear();


/* LAST MODIFIED */

document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;


/* FORM TIMESTAMP */

document.querySelector("#timestamp").value =
    new Date().toISOString();


/* MEMBERSHIP MODALS */

const modalLinks = document.querySelectorAll(
    ".membership-card a"
);

const closeButtons = document.querySelectorAll(
    ".close-modal"
);

modalLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

        const modalId = link.getAttribute("href");

        const modal = document.querySelector(modalId);

        modal.showModal();
    });
});


closeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const modal = button.closest("dialog");

        modal.close();
    });
});