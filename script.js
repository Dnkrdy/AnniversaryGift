document.addEventListener("DOMContentLoaded", function () {
    let countdown = 10;
    const timerElement = document.getElementById("timer");
    let countdownStarted = false;
    const musicDelay = 20000;
    const countdownSpeed = 2100;
    function updateCountdown() {
        if (countdown > 1) {
            timerElement.innerHTML = countdown;
            countdown--;
            setTimeout(updateCountdown, countdownSpeed);
        } else {
            timerElement.innerHTML = "1";
            setTimeout(() => {
                window.location.href = 'gallery.html';
            }, countdownSpeed);
        }
    }
    document.addEventListener("keydown", function () {
        if (!countdownStarted) {
            countdownStarted = true;
            playYouTubeMusic();
            setTimeout(updateCountdown, musicDelay);
        }
    });
    function playYouTubeMusic() {
        let iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = "https://www.youtube.com/embed/H_bB0sAqLNg?autoplay=1";
        iframe.allow = "autoplay";
        document.body.appendChild(iframe);
    }
    function createConfetti() {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        document.body.appendChild(confetti);

        const size = Math.random() * 10 + 5;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = ["gold", "cyan", "pink", "blue", "red", "yellow"][Math.floor(Math.random() * 6)];
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;

        setTimeout(() => confetti.remove(), 5000);
    }
    setInterval(createConfetti, 100);
});