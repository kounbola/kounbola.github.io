// Example CSV data for movies, actors, and characters
const csvData = [
    { movie: "Dilwale Dulhania Le Jayenge", actor: "Shah Rukh Khan", character: "Raj" },
    { movie: "Kabhi Khushi Kabhie Gham", actor: "Amitabh Bachchan", character: "Yash" },
    { movie: "Lagaan", actor: "Aamir Khan", character: "Bhuvan" },
    { movie: "Zindagi Na Milegi Dobara", actor: "Hrithik Roshan", character: "Arjun" },
    // Add more rows as necessary
];

// Initial setup
let team1 = ["Player 1", "Player 2"];
let team2 = ["Player 3", "Player 4"];
let currentTeam = '';
let currentPlayer = '';
let timer = 60;
let scoreTeam1 = 0;
let scoreTeam2 = 0;
let currentQuestion = {};

// Function to start the game
function startGame() {
    if (team1.length >= 2 && team2.length >= 2) {
        // Randomly select the starting team and player
        currentTeam = Math.random() > 0.5 ? 'Team 1' : 'Team 2';
        currentPlayer = currentTeam === 'Team 1' ? team1[Math.floor(Math.random() * team1.length)] : team2[Math.floor(Math.random() * team2.length)];

        document.getElementById("current-player").textContent = currentPlayer;
        document.getElementById("start-btn").style.display = "none"; // Hide start button
        document.getElementById("next-btn").style.display = "inline-block"; // Show next button
        startTimer();
        loadQuestion();
    } else {
        alert("Please add at least 2 players to each team.");
    }
}

// Timer functionality (Digital clock format)
function startTimer() {
    let timerInterval = setInterval(() => {
        if (timer <= 0) {
            clearInterval(timerInterval);
            alert("Time's up! Next player's turn.");
            loadNextQuestion();
        } else {
            document.getElementById("time-remaining").textContent = timer;
            timer--;
        }
    }, 1000);
}

// Load a random question
function loadQuestion() {
    const randomIndex = Math.floor(Math.random() * csvData.length);
    currentQuestion = csvData[randomIndex];
    
    // Update the text content of each category
    document.getElementById("movie").textContent = currentQuestion.movie;
    document.getElementById("actor").textContent = currentQuestion.actor;
    document.getElementById("character").textContent = currentQuestion.character;
}

// Select an answer and gain points
function selectAnswer(type) {
    const row = event.target;
    let points = 0;

    if (type === 'movie' && row.textContent === currentQuestion.movie) {
        row.style.backgroundColor = "green";
        points = 3;
    } else if (type === 'actor' && row.textContent === currentQuestion.actor) {
        row.style.backgroundColor = "green";
        points = 2;
    } else if (type === 'character' && row.textContent === currentQuestion.character) {
        row.style.backgroundColor = "green";
        points = 1;
    } else {
        row.style.backgroundColor = "red";
    }

    // Update score
    if (currentTeam === 'Team 1') {
        scoreTeam1 += points;
        document.getElementById("team1-score").textContent = scoreTeam1;
    } else {
        scoreTeam2 += points;
        document.getElementById("team2-score").textContent = scoreTeam2;
    }

    // Show next question only if player earned points
    if (points > 0) {
        document.getElementById("next-btn").style.display = "inline-block";
    }
}

// Next button functionality
function loadNextQuestion() {
    loadQuestion();
    document.getElementById("next-btn").style.display = "none";
}