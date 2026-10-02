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


/* FOOTER */

document.querySelector("#currentyear").textContent =
    new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;



const params = new URLSearchParams(window.location.search);

const firstName = params.get("firstName");
const lastName = params.get("lastName");
const email = params.get("email");
const phone = params.get("phone");
const organization = params.get("organization");
const timestamp = params.get("timestamp");

const information =
    document.querySelector("#application-information");

information.innerHTML = `
    <h2>Application Information</h2>

    <p>
        <strong>Name:</strong>
        ${firstName || ""} ${lastName || ""}
    </p>

    <p>
        <strong>Email:</strong>
        ${email || ""}
    </p>

    <p>
        <strong>Mobile Phone:</strong>
        ${phone || ""}
    </p>

    <p>
        <strong>Business / Organization:</strong>
        ${organization || ""}
    </p>

    <p>
        <strong>Application Date:</strong>
        ${timestamp || ""}
    </p>
`;