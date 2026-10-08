import { attractions } from "../data/discover.mjs";

const discoverGrid = document.querySelector("#discover-grid");

function displayAttractions() {
    discoverGrid.innerHTML = "";

    attractions.forEach((attraction, index) => {
        const card = document.createElement("article");

        card.classList.add("discover-card");
        card.classList.add(`area-${index + 1}`);

        card.innerHTML = `
            <h2>${attraction.name}</h2>

            <figure>
                <img
                    src="${attraction.image}"
                    alt="${attraction.name}"
                    loading="lazy"
                    width="300"
                    height="200"
                >
            </figure>

            <address>${attraction.address}</address>

            <p>${attraction.description}</p>

            <button type="button">Learn More</button>
        `;

        discoverGrid.appendChild(card);
    });
}

displayAttractions();


/* Visitor Message */

const visitorMessage = document.querySelector("#visitor-message");

const currentVisit = Date.now();
const previousVisit = localStorage.getItem("lastVisit");

if (!previousVisit) {

    visitorMessage.textContent =
        "Welcome! Let us know if you have any questions.";

} else {

    const timeDifference = currentVisit - Number(previousVisit);

    const oneDay = 24 * 60 * 60 * 1000;

    if (timeDifference < oneDay) {

        visitorMessage.textContent =
            "Back so soon! Awesome!";

    } else {

        const days = Math.floor(timeDifference / oneDay);

        const dayWord = days === 1 ? "day" : "days";

        visitorMessage.textContent =
            `You last visited ${days} ${dayWord} ago.`;
    }
}

localStorage.setItem("lastVisit", currentVisit);