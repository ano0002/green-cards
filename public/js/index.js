// Fetch today's question from the api
fetch('/api/questions/today')
    .then(response => response.json())
    .then(response => {
        if (response.error) {
            console.error('Error:', response.error);
            return;
        }
        const data = response.data;
        const questionElement = document.getElementById('question');
        questionElement.innerText = data.sentence; // Set the question text
    })
    .catch(error => console.error('Error fetching the question:', error));

function submitAnswer(e){
    e.preventDefault(); // Prevent the default form submission
    document.getElementById("submit").disabled = true; // Disable the button to prevent multiple submissions
    document.getElementById("submit").innerText = "Submitting..."; // Change button text

    const answer = document.getElementById("answer").value;

    var token = null; 

    for (let i = 0; i < document.cookie.split(";").length; i++) {
        const cookie = document.cookie.split(";")[i].trim();
        if (cookie.startsWith("token=")) {
            token = cookie.split("=")[1];
            break;
        }
    }

    var body = {
        answer: answer
    };

    if (token) {
        body.token = token;
    }

    fetch("/api/questions/today", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    .then(response => {
        if (response.status === 200 || response.status === 400) {
            return response.json();
        } else {
            throw new Error("Submission failed");
        }
    })
    .then(data => {
        const message = data.message;
        if (data.message.startsWith("Correct")) {
            alert(message);
            if (token) {
                // Redirect to the cards page if the user is logged in
                window.location.href = "/profile.html";
            }
        } else {
            alert(`Incorrect! The correct answer is: ${data.expectedAnswer}.`);
        }
    })
}

document.getElementById("answer-form").addEventListener("submit", submitAnswer);