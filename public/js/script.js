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