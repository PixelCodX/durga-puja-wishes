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
// Generate a personalized Durga Puja greeting card
async function createGreetingImage(name) {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;

  const ctx = canvas.getContext("2d");

  // Load Maa Durga artwork
  const img = new Image();
  img.src = "assets/images/durga-puja.webp";

  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
  });

  // Draw artwork as the background
  const scale = Math.max(
    canvas.width / img.width,
    canvas.height / img.height
  );

  const width = img.width * scale;
  const height = img.height * scale;

  ctx.drawImage(
    img,
    (canvas.width - width) / 2,
    (canvas.height - height) / 2,
    width,
    height
  );

  // Dark gradient for readable text
  const gradient = ctx.createLinearGradient(
    0, 0, 0, canvas.height
  );

  gradient.addColorStop(0, "rgba(20, 0, 0, 0.15)");
  gradient.addColorStop(0.45, "rgba(20, 0, 0, 0.15)");
  gradient.addColorStop(1, "rgba(20, 0, 0, 0.88)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Golden border
  ctx.strokeStyle = "#e7bd70";
  ctx.lineWidth = 8;
  ctx.strokeRect(32, 32, 1016, 1286);

  ctx.textAlign = "center";

  // Festival title
  ctx.fillStyle = "#ffe4a6";
  ctx.font = "bold 68px Georgia";
  ctx.fillText("SHUBHO", 540, 950);

  ctx.font = "bold 76px Georgia";
  ctx.fillText("DURGA PUJA", 540, 1040);

  // Blessing message
  ctx.fillStyle = "#ffffff";
  ctx.font = "34px Arial";
  ctx.fillText(
    "Maa Durga bless you and your family",
    540,
    1110
  );

  ctx.fillText(
    "with happiness and prosperity.",
    540,
    1160
  );

  // Sender's name
  ctx.fillStyle = "#ffe4a6";
  ctx.font = "bold 38px Arial";

  const sender = `With love, ${name}`;

  ctx.fillText(sender, 540, 1240);

  // Return the generated PNG image
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("Could not create greeting image."));
      }
    }, "image/png");
  });
                    }
// =====================================
// PERSONALIZED GREETING PREVIEW
// =====================================

function showGreetingPreview(name, greetingLink, whatsappLink) {
  const existing = document.getElementById("greetingPreview");

  if (existing) existing.remove();

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

  // DOWNLOAD IMAGE BUTTON
  const downloadButton = document.createElement("button");
  downloadButton.className = "create-btn";
  downloadButton.textContent = "📥 Download Greeting Image";

  downloadButton.addEventListener("click", async () => {
    downloadButton.disabled = true;
    downloadButton.textContent = "Creating image...";

    try {
      const blob = await createGreetingImage(name);
      const imageUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "durga-puja-greeting.png";
      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => URL.revokeObjectURL(imageUrl), 3000);

      downloadButton.textContent = "✅ Image Downloaded!";
    } catch (error) {
      console.error(error);
      alert("Image create nahi hui. Please image file check karo.");
      downloadButton.textContent = "📥 Download Greeting Image";
    } finally {
      downloadButton.disabled = false;
    }
  });

  // SHARE IMAGE BUTTON
  const imageShareButton = document.createElement("button");
  imageShareButton.className = "create-btn";
  imageShareButton.textContent = "📲 Share Greeting Image";

  imageShareButton.addEventListener("click", async () => {
    imageShareButton.disabled = true;
    imageShareButton.textContent = "Preparing image...";

    try {
      const blob = await createGreetingImage(name);

      const file = new File(
        [blob],
        "durga-puja-greeting.png",
        { type: "image/png" }
      );

      if (
        navigator.canShare &&
        navigator.canShare({ files: [file] }) &&
        navigator.share
      ) {
        await navigator.share({
  files: [file],
  title: "🌺 Shubho Durga Puja",
  text:
    `🌺 Shubho Durga Puja! 🌺\n\n` +
    `Maa Durga ki kripa aap aur aapke parivaar par bani rahe. 🙏\n\n` +
    `Shubhkamnayein ${name} ki aur se! ❤️\n\n` +
    `✨ Apna personalized greeting yahan banayein:\n` +
    `${greetingLink}\n\n` +
    `Apne friends ke saath bhi share karein! 🌸`
});
      } else {
        const imageUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = imageUrl;
        link.download = "durga-puja-greeting.png";
        link.click();

        setTimeout(() => URL.revokeObjectURL(imageUrl), 3000);

        alert(
          "Image download ho gayi! Ab WhatsApp kholo aur image attach karke share karo."
        );
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error);
        alert("Image share nahi ho payi. Download button try karo.");
      }
    } finally {
      imageShareButton.disabled = false;
      imageShareButton.textContent = "📲 Share Greeting Image";
    }
  });

  // SHARE TEXT ON WHATSAPP
  const shareButton = document.createElement("a");
  shareButton.className = "create-btn";
  shareButton.href = whatsappLink;
  shareButton.target = "_blank";
  shareButton.rel = "noopener noreferrer";
  shareButton.textContent = "💬 Share Text on WhatsApp";

  // COPY LINK BUTTON
  const copyButton = document.createElement("button");
  copyButton.className = "copy-btn";
  copyButton.textContent = "🔗 Copy Greeting Link";

  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(greetingLink);
      copyButton.textContent = "✅ Link Copied!";
    } catch {
      window.prompt("Copy your greeting link:", greetingLink);
    }
  });

  // CLOSE BUTTON
  const closeButton = document.createElement("button");
  closeButton.className = "copy-btn";
  closeButton.textContent = "Close Greeting";
  closeButton.addEventListener("click", () => preview.remove());

  actions.append(
    downloadButton,
    imageShareButton,
    shareButton,
    copyButton,
    closeButton
  );

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
