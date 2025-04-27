document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    document.getElementById("register-btn").disabled = true; // Disable the button to prevent multiple submissions
    document.getElementById("register-btn").innerText = "Registering..."; // Change button text

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("confirm_password").value;

    if (password !== passwordConfirm) {
        alert("Passwords do not match!");
        document.getElementById("register-btn").disabled = false; // Re-enable the button
        document.getElementById("register-btn").innerText = "Register"; // Reset button text
        return;
    }

    fetch("/api/users/register", {
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
            throw new Error("Registration failed");
        }
    })
    .then(response => {
        alert("Registration successful!"); // Show success message
        // Redirect to the dashboard or home page
        window.location.href = "/login.html"; // Change this to your desired redirect URL
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("register-btn").disabled = false; // Re-enable the button
        document.getElementById("register-btn").innerText = "Register"; // Reset button text
        alert("Registration failed. "); // Show error message
    });
})