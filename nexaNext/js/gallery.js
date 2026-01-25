const params = new URLSearchParams(window.location.search);
const userId = params.get("id");

const galleryDiv = document.getElementById("gallery");

if (!userId) {
  galleryDiv.textContent = "Invalid user.";
  throw new Error("Missing user id");
}

loadGallery();

function loadGallery() {
  const images = JSON.parse(localStorage.getItem("cachedImages")) || [];

  if (!images.length) {
    galleryDiv.textContent = "No images found.";
    return;
  }

  renderGallery(images);
}

function renderGallery(images) {
  galleryDiv.innerHTML = "";

  for (let i = 0; i < images.length; i++) {
    const img = document.createElement("img");

    img.src = `${images[i].url}?user=${userId}&img=${i}`;
    img.alt = `Gallery image ${i + 1}`;
    img.className = "gallery-img";

    img.addEventListener("click", function () {
      openModal(img.src);
    });

    galleryDiv.appendChild(img);
  }
}

function goBack() {
  window.location.href = `profile.html?id=${userId}`;
}

const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");

function openModal(src) {
  modalImage.src = src;
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
  modalImage.src = "";
}

modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    closeModal();
  }
});