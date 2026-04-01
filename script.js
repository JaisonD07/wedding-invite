const envelopeScreen = document.getElementById("envelopeScreen");
const invitationPage = document.getElementById("invitationPage");
const openButton = document.getElementById("openButton");
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");
const sparkles = document.getElementById("sparkles");
const revealItems = document.querySelectorAll(".reveal");

let invitationOpened = false;
let autoOpenTimer;

function setMusicButtonLabel() {
  musicToggle.textContent = bgMusic.paused ? "Music Off" : "Music On";
}

async function tryPlayMusic() {
  try {
    await bgMusic.play();
  } catch (error) {
    setMusicButtonLabel();
  }
}

function showInvitation() {
  if (invitationOpened) return;
  invitationOpened = true;
  clearTimeout(autoOpenTimer);

  envelopeScreen.classList.add("opened");

  setTimeout(() => {
    envelopeScreen.classList.add("hidden");
    invitationPage.classList.remove("hidden");
    revealOnScroll();
  }, 2400);

  tryPlayMusic();
}

function revealOnScroll() {
  revealItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      item.classList.add("visible");
    }
  });
}

function createSparkles() {
  const sparkleCount = 24;

  for (let i = 0; i < sparkleCount; i += 1) {
    const particle = document.createElement("span");
    particle.className = "sparkle";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.bottom = `${-10 - Math.random() * 20}px`;
    particle.style.animationDuration = `${10 + Math.random() * 8}s`;
    particle.style.animationDelay = `${Math.random() * 6}s`;
    particle.style.setProperty("--drift-x", `${(Math.random() - 0.5) * 90}px`);
    particle.style.opacity = `${0.25 + Math.random() * 0.45}`;
    sparkles.appendChild(particle);
  }
}

openButton.addEventListener("click", showInvitation);

musicToggle.addEventListener("click", async () => {
  if (bgMusic.paused) {
    await tryPlayMusic();
  } else {
    bgMusic.pause();
  }
  setMusicButtonLabel();
});

document.addEventListener("visibilitychange", () => {
  if (!document.hidden && !bgMusic.paused && invitationOpened) {
    tryPlayMusic();
  }
});

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", async () => {
  createSparkles();
  setMusicButtonLabel();
  autoOpenTimer = setTimeout(showInvitation, 5000);
  await tryPlayMusic();
  revealOnScroll();
});
