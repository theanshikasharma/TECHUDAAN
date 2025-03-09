const API_URL = "http://localhost:5000"; // Backend URL

async function register() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    alert(data.message);
}

async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        fetchHackathons();
    } else {
        alert("Login failed!");
    }
}

async function fetchHackathons() {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/hackathons`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` },
    });

    const hackathons = await res.json();
    document.getElementById("hackathon-list").innerHTML = hackathons.map(h => `<li>${h.name}</li>`).join("");
    document.getElementById("hackathon-section").style.display = "block";
}

