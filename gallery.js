document.addEventListener("DOMContentLoaded", function () {
    const quotes = [
        "Wishing you a lifetime of happiness and beautiful memories. Happy anniversary to the most loving parents!!!",
        "Here's to 22 years of laughter, love, and cherished moments.",
        "6th March 2003...."
    ];
    const textContainer = document.querySelector(".text-box");
    const textElement = document.getElementById("animated-text");
    const slideshow = document.querySelector(".slideshow");
    const slides = document.querySelectorAll(".slide");
    const navDotsContainer = document.querySelector(".nav-dots");

    let quoteIndex = 0, charIndex = 0, isTyping = true;
    const typingSpeed = 80, pauseAfterTyping = 1000, fadeOutSpeed = 300;
    let canStartText = false;
    let slideshowInterval;
    let isPopupShown = false;

    // Show Music Selection Popup
    function showMusicPopup() {
        const popup = document.createElement("div");
        popup.classList.add("popup-box");
        popup.innerHTML = `
            <button class="close-btn">×</button>
            <div class="popup-content">
                <h2>Would you like to play background music?</h2>
                <button id="play-music-btn">Yes</button>
                <button id="no-music-btn">No</button>
            </div>
        `;
        document.body.appendChild(popup);

        popup.querySelector(".close-btn").addEventListener("click", closePopup);
        popup.querySelector("#play-music-btn").addEventListener("click", () => {
            playYouTubeMusic();
            closePopup();
        });
        popup.querySelector("#no-music-btn").addEventListener("click", closePopup);

        function closePopup() {
            popup.remove();
            canStartText = true; 
            typeText();
        }
    }

    // Play Background Music from YouTube
    function playYouTubeMusic() {
        const iframe = document.createElement("iframe");
        iframe.src = "https://www.youtube.com/embed/EO3JWdSL1mk?autoplay=1&loop=1&playlist=EO3JWdSL1mk";
        iframe.style.display = "none";
        iframe.allow = "autoplay";
        document.body.appendChild(iframe);
    }

    // Typing Effect for Text Box
    function typeText() {
        if (!canStartText) return; 

        let currentText = quotes[quoteIndex];
        let cursor = `<span class="cursor">|</span>`;

        if (isTyping) {
            textElement.innerHTML = currentText.slice(0, charIndex) + cursor;
            charIndex++;

            if (charIndex > currentText.length) {
                isTyping = false;
                setTimeout(fadeOutText, pauseAfterTyping);
            } else {
                setTimeout(typeText, typingSpeed);
            }
        }
    }

    // Fade Out Text Before Next Quote
    function fadeOutText() {
        textElement.style.transition = `opacity ${fadeOutSpeed}ms ease-in-out`;
        textElement.style.opacity = "0";

        setTimeout(() => {
            charIndex = 0;
            quoteIndex = (quoteIndex + 1) % quotes.length;
            textElement.innerHTML = "";
            textElement.style.opacity = "1";
            isTyping = true;

            if (quoteIndex === 0) {
                setTimeout(removeTextSection, 1000);
            } else {
                typeText();
            }
        }, fadeOutSpeed);
    }

    // Remove Text Section and Start Slideshow
    function removeTextSection() {
        textContainer.style.transition = "opacity 1s ease-out";
        textContainer.style.opacity = "0";
        setTimeout(() => {
            textContainer.remove();
            showGallery();
        }, 1000);
    }

    // Slideshow Functionality
    function showGallery() {
        let currentIndex = 0;
        isPopupShown = false;
        slideshow.style.opacity = "1";
        navDotsContainer.innerHTML = "";

        slides.forEach((_, i) => {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            if (i === 0) dot.classList.add("active");
            dot.addEventListener("click", () => changeSlide(i));
            navDotsContainer.appendChild(dot);
        });

        function changeSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle("active", i === index);
                navDotsContainer.children[i].classList.toggle("active", i === index);
            });
            currentIndex = index;
        }

        function showNextSlide() {
            currentIndex++;
            if (currentIndex < slides.length) {
                changeSlide(currentIndex);
            } else if (!isPopupShown) {
                clearInterval(slideshowInterval);
                isPopupShown = true;
                setTimeout(showPopup, 1000);
            }
        }

        function restartSlideshow() {
            clearInterval(slideshowInterval);
            isPopupShown = false;
            currentIndex = 0;
            changeSlide(currentIndex);
            slideshowInterval = setInterval(showNextSlide, 3000);
        }

        changeSlide(currentIndex);
        slideshowInterval = setInterval(showNextSlide, 3000);

        return restartSlideshow;
    }

    // Popup for Revisiting Slideshow or Moving to Digital Card
    function showPopup() {
        const popup = document.createElement("div");
        popup.classList.add("popup-box");
        popup.innerHTML = `
            <button class="close-btn">×</button>
            <div class="popup-content">
                <h2>Would you like to revisit the slideshow or go to the digital card?</h2>
                <button id="revisit-btn">Revisit Slideshow</button>
                <button id="next-btn">Go to Digital Card</button>
            </div>
        `;
        document.body.appendChild(popup);

        popup.querySelector(".close-btn").addEventListener("click", () => popup.remove());
        popup.querySelector("#revisit-btn").addEventListener("click", () => {
            popup.remove();
            const restartSlideshow = showGallery();
            restartSlideshow();
        });
        popup.querySelector("#next-btn").addEventListener("click", () => {
            window.location.href = "dc.html";
        });
    }

    // Initialize Music Popup on Page Load
    showMusicPopup();
});