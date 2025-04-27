document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    document.getElementById("login-btn").disabled = true; // Disable the button to prevent multiple submissions
    document.getElementById("login-btn").innerText = "Logging in..."; // Change button text

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Login failed");
        }
    })
    .then(response => {
        // set cookie with JWT token
        const data = response.data;
        const token = data.token;
        const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiration
        document.cookie = `token=${token}; expires=${expires.toUTCString()}; path=/`;
        // Redirect to the dashboard or home page
        window.location.href = "/profile.html"; // Change this to your desired redirect URL
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("login-btn").disabled = false; // Re-enable the button
        document.getElementById("login-btn").innerText = "Login"; // Reset button text
        alert("Login failed. Please check your username and password."); // Show error message
    });
})