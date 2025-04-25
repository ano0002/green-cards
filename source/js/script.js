document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('#question-list .question');
    const totalQuestions = questions.length;

    // Generate an array of random indices for 3 questions
    const selectedIndices = [];
    while (selectedIndices.length < 3) {
        const randomIndex = Math.floor(Math.random() * totalQuestions);
        if (!selectedIndices.includes(randomIndex)) {
            selectedIndices.push(randomIndex);
        }
    }

    // Show only the selected questions, hide the others
    questions.forEach((question, index) => {
        if (selectedIndices.includes(index)) {
            question.style.display = 'block'; // Show selected questions
        } else {
            question.style.display = 'none'; // Hide others
        }
    });

    // Answer list
    const answers = [
        "7",
        "Energy audit",
        "Power Usage Effectiveness",
        "Sustainable software",
        "False",
        "C",
        "True",
        "Virtualisation",
        "Green Ethernet",
        "Sleep Modes",
        "Data centre",
        "264",
        "It for Green",
        "Green IT",
        "placeholder"
    ];

    // Add event listeners to check answers
    questions.forEach((question, index) => {
        const input = question.querySelector('.answer-input');
        const button = question.querySelector('.btn');

        if (input && button) {
            button.addEventListener('click', () => {
                const userAnswer = input.value.trim();
                const feedback = document.createElement('p');

                // Remove any existing feedback
                const existingFeedback = question.querySelector('p.feedback');
                if (existingFeedback) {
                    existingFeedback.remove();
                }

                if (userAnswer.toLowerCase() === answers[index].toLowerCase()) {
                    feedback.textContent = "Congratulations! You won the card associated with this question!";
                    feedback.style.color = 'green';
                    feedback.classList.add('feedback');
                    question.appendChild(feedback);

                    // Hide input and button
                    input.style.display = 'none';
                    button.style.display = 'none';
                } else {
                    feedback.textContent = "Wrong answer, please try again.";
                    feedback.style.color = 'red';
                    feedback.classList.add('feedback');
                    question.appendChild(feedback);
                }
            });
        }
    });
});