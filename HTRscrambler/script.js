document.addEventListener("DOMContentLoaded", function() {
    const generateButton = document.getElementById("generate-button");
    const randomLineDisplay = document.getElementById("random-line");

    generateButton.addEventListener("click", function() {
        const rand = Math.floor(Math.random() * 2);
        const textFile = (rand < 1) ? 'scrambleListA.txt' : 'scrambleListB.txt';
        fetch(textFile)
            .then(response => response.text())
            .then(data => {
                const lines = data.split('\n');
                const randomIndex = Math.floor(Math.random() * lines.length);
                const randomLine = lines[randomIndex];
                randomLineDisplay.textContent = randomLine;
            })
            .catch(error => {
                console.error("Error fetching lines.txt:", error);
            });
    });
});

