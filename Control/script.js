const slides = document.querySelectorAll(".slide");
const countdownOverlay = document.getElementById("countdownOverlay");
const slideText = document.getElementById("slideText");
const catText = document.querySelector(".cat-text");

let currentSlide = 0;

const slideMessages = [
  "Hey, look there's a cat!",
  "Please, don't bother the cat!",
  "Stop pressing the cat!",
  "You should really stop!",
  ""
];

// Show a slide by index
function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[index].classList.add("active");
  slideText.textContent = slideMessages[index] || "";
}

// Countdown
function startCountdown(seconds, callback) {
  countdownOverlay.style.display = "flex";
  countdownOverlay.textContent = seconds;

  const countdownInterval = setInterval(() => {
    seconds--;
    countdownOverlay.textContent = seconds;

    if (seconds <= 0) {
      clearInterval(countdownInterval);
      countdownOverlay.style.display = "none";
      callback();
    }
  }, 1000);
}

// Click to go to next slide
slides.forEach((slide) => {
  slide.addEventListener("click", () => {
    if (currentSlide === 3) {
      startCountdown(5, () => {
        currentSlide++;
        showSlide(currentSlide);

        if (currentSlide === slides.length - 1) {
          handleFinalSlide();
        }
      });
    } else if (currentSlide < slides.length - 1) {
      currentSlide++;
      showSlide(currentSlide);
    }
  });
});

// Initial load
showSlide(currentSlide);

// Change cat text after GIF
function handleFinalSlide() {
  const gifSlide = slides[slides.length - 1];

  if (gifSlide.classList.contains("active")) {
    setTimeout(() => {
      catText.textContent = "Aw man, you made the cat blue";
    }, 3000);
  }
}

// Reload on clicking final message
catText.addEventListener("click", () => {
  if (catText.textContent === "Aw man, you made the cat blue") {
    location.reload();
  }
});