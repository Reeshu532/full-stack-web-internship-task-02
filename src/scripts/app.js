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

        const users = await response.json();

        state.users = users;
        state.filteredUsers = users;

        renderUsers();
    } catch (error) {
        console.error("Error:", error);
        userSection.innerHTML = "<p>Unable to load users.</p>";
    }
}

function renderUsers() {
    userSection.innerHTML = "";

    state.filteredUsers.forEach((user) => {
        const article = document.createElement("article");

        article.innerHTML = `
            <h3>${user.name}</h3>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <p>Website: ${user.website}</p>
        `;

        userSection.appendChild(article);
    });
}

function filterUsers() {
    const searchTerm = searchInput.value.toLowerCase();

    state.filteredUsers = state.users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm)
    );

    renderUsers();
}

searchInput.addEventListener("input", filterUsers);

fetchUsers();
