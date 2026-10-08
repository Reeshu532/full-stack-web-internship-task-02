const state = {
    users: [],
    filteredUsers: []
};

const searchInput = document.querySelector("#user-search");
const userSection = document.querySelector("#users");

async function fetchUsers() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        state.users = await response.json();
        state.filteredUsers = [...state.users];

        renderUsers();
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

function renderUsers() {
    let results = document.querySelector("#user-results");

    if (!results) {
        results = document.createElement("div");
        results.id = "user-results";
        results.setAttribute("aria-live", "polite");
        userSection.appendChild(results);
    }

    results.innerHTML = "";

    state.filteredUsers.forEach((user) => {
        const article = document.createElement("article");

        const name = document.createElement("h3");
        name.textContent = user.name;

        const email = document.createElement("p");
        email.textContent = `Email: ${user.email}`;

        const company = document.createElement("p");
        company.textContent = `Company: ${user.company.name}`;

        article.append(name, email, company);
        results.appendChild(article);
    });
}

function filterUsers() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    state.filteredUsers = state.users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm)
    );

    renderUsers();
}

searchInput.addEventListener("input", filterUsers);

fetchUsers();
