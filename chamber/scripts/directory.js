const membersContainer = document.querySelector("#members");

const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        const members = await response.json();

        displayMembers(members);
    } catch (error) {
        console.error("Error loading members:", error);
        membersContainer.innerHTML =
            "<p>Sorry, the member directory could not be loaded.</p>";
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("article");

        card.classList.add("member-card");

        card.innerHTML = `
            <img src="images/${member.image}"
                alt="${member.name} logo"
                loading="lazy">

            <div class="member-information">
                <h2>${member.name}</h2>

                <p>${member.description}</p>

                <p>
                    <strong>Address:</strong>
                    ${member.address}
                </p>

                <p>
                    <strong>Phone:</strong>
                    ${member.phone}
                </p>

                <p>
                    <strong>Membership:</strong>
                    ${getMembershipLevel(member.membership)}
                </p>

                <a href="${member.website}"
                    target="_blank"
                    rel="noopener noreferrer">
                    Visit Website
                </a>
            </div>
        `;

        membersContainer.appendChild(card);
    });
}

function getMembershipLevel(level) {
    if (level === 3) {
        return "Gold";
    }

    if (level === 2) {
        return "Silver";
    }

    return "Member";
}

gridButton.addEventListener("click", () => {
    membersContainer.classList.add("member-grid");
    membersContainer.classList.remove("member-list");
});

listButton.addEventListener("click", () => {
    membersContainer.classList.add("member-list");
    membersContainer.classList.remove("member-grid");
});


document.querySelector("#currentyear").textContent =
    new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;

getMembers();