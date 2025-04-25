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
});