// =====================================
// CINEMATIC GOLDEN PARTICLES
// =====================================

const particlesContainer = document.getElementById("particles");

for (let i = 0; i < 35; i++) {
  const particle = document.createElement("span");

  particle.className = "particle";
  particle.style.left = Math.random() * 100 + "%";
  particle.style.animationDuration = 7 + Math.random() * 12 + "s";
  particle.style.animationDelay = Math.random() * 12 + "s";

  const size = 2 + Math.random() * 3;
  particle.style.width = size + "px";
  particle.style.height = size + "px";

  particlesContainer.appendChild(particle);
}


// =====================================
// ELEMENTS
// =====================================

const createGreetingBtn = document.getElementById("createGreeting");
const nameModal = document.getElementById("nameModal");
const closeModalBtn = document.getElementById("closeModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const visitorNameInput = document.getElementById("visitorName");
const generateGreetingBtn = document.getElementById("generateGreeting");
const formError = document.getElementById("formError");


// =====================================
// OPEN AND CLOSE NAME MODAL
// =====================================

function openModal() {
  nameModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    visitorNameInput.focus();
  }, 150);
}

function closeModal() {
  nameModal.classList.add("hidden");
  document.body.style.overflow = "";
  formError.textContent = "";
}

createGreetingBtn.addEventListener("click", openModal);

closeModalBtn.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !nameModal.classList.contains("hidden")) {
    closeModal();
  }
});


// =====================================
// READ NAME FROM PERSONALIZED URL
// Example: ?name=Harsh
// =====================================

const params = new URLSearchParams(window.location.search);
const sharedName = params.get("name");

if (sharedName) {
  visitorNameInput.value = sharedName.slice(0, 40);
}


// =====================================
// GENERATE PERSONALIZED GREETING LINK
// =====================================

function generateLink(name) {
  const url = new URL(window.location.href);

  url.search = "";
  url.searchParams.set("name", name);

  return url.toString();
}

function generateGreeting() {
  const name = visitorNameInput.value.trim();

  if (!name) {
    formError.textContent = "Please enter your name first.";
    visitorNameInput.focus();
    return;
  }

  if (name.length > 40) {
    formError.textContent = "Please use a shorter name.";
    return;
  }

  const greetingLink = generateLink(name);

  const message =
    `🌺 Shubho Durga Puja! 🌺\n\n` +
    `Maa Durga ki kripa aap aur aapke parivaar par bani rahe. 🙏\n\n` +
    `Shubhkamnayein ${name} ki aur se ❤️\n\n` +
    `✨ Apna greeting banayein:\n${greetingLink}`;

  const whatsappLink =
    "https://wa.me/?text=" + encodeURIComponent(message);

  closeModal();

  // Display a personalized greeting preview.
  showGreetingPreview(name, greetingLink, whatsappLink);
}

generateGreetingBtn.addEventListener("click", generateGreeting);

visitorNameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    generateGreeting();
  }
});


// =====================================
// PERSONALIZED GREETING PREVIEW
// =====================================

function showGreetingPreview(name, greetingLink, whatsappLink) {
  const existing = document.getElementById("greetingPreview");

  if (existing) {
    existing.remove();
  }

  const preview = document.createElement("section");
  preview.id = "greetingPreview";
  preview.className = "greeting-preview";

  const title = document.createElement("h2");
  title.textContent = "🌺 Shubho Durga Puja 🌺";

  const message = document.createElement("p");
  message.textContent =
    "May Maa Durga bless you and your family with happiness, strength and prosperity.";

  const signature = document.createElement("p");
  signature.className = "greeting-signature";
  signature.textContent = `With warm wishes, ${name} ❤️`;

  const actions = document.createElement("div");
  actions.className = "preview-actions";

  const shareButton = document.createElement("a");
  shareButton.className = "create-btn";
  shareButton.href = whatsappLink;
  shareButton.target = "_blank";
  shareButton.rel = "noopener noreferrer";
  shareButton.textContent = "Share on WhatsApp ↗";

  const copyButton = document.createElement("button");
  copyButton.className = "copy-btn";
  copyButton.textContent = "Copy Greeting Link";

  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(greetingLink);
      copyButton.textContent = "✓ Link Copied!";

      setTimeout(() => {
        copyButton.textContent = "Copy Greeting Link";
      }, 2000);
    } catch {
      window.prompt("Copy your greeting link:", greetingLink);
    }
  });

  const closeButton = document.createElement("button");
  closeButton.className = "copy-btn";
  closeButton.textContent = "Close Greeting";

  closeButton.addEventListener("click", () => {
    preview.remove();
  });

  actions.append(shareButton, copyButton, closeButton);
  preview.append(title, message, signature, actions);

  document.body.appendChild(preview);

  preview.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}


// =====================================
// PERSONALIZED WELCOME MESSAGE
// =====================================

if (sharedName && sharedName.trim()) {
  const intro = document.querySelector(".intro");

  if (intro) {
    intro.textContent =
      `A special Durga Puja greeting from ${sharedName.trim()}. ` +
      "May Maa Durga bless you and your family.";
  }

  createGreetingBtn.textContent = "✦ Create Your Own Greeting ↗";
}


// =====================================
// IMAGE ERROR FALLBACK
// =====================================

const durgaImage = document.getElementById("durgaImage");

durgaImage.addEventListener("error", () => {
  durgaImage.alt = "Maa Durga artwork could not be loaded. Please check the image filename.";
});
