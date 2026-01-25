const params = new URLSearchParams(window.location.search);
const userId = params.get("id");

const profileDiv = document.getElementById("profile");

if (!userId) {
  profileDiv.textContent = "Invalid user.";
  throw new Error("Missing user id");
}

loadProfile();

function loadProfile() {
  const users = JSON.parse(localStorage.getItem("cachedUsers")) || [];
  const images = JSON.parse(localStorage.getItem("cachedImages")) || [];

  if (!users.length || !images.length) {
    profileDiv.textContent = "No cached data found.";
    return;
  }

  const userIndex = users.findIndex(u => String(u.id) === userId);
  const user = users[userIndex];

  if (!user) {
    profileDiv.textContent = "User not found.";
    return;
  }

  const profileImage = images[userIndex % images.length].url;

  renderProfile(user, profileImage);
}

function renderProfile(user, profileImage) {
  
  profileDiv.innerHTML = `
    <div class="profile-card">

      <img class="profile-img"
        src="${profileImage}?random=${user.id}"
        alt="${user.firstname}" </img>

      <h1>${user.firstname} ${user.lastname}</h1>

      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Job:</strong> ${user.job?.title || "Not available"}</p>
      <p><strong>Date of birth:</strong> ${user.birthday || "Unknown"}</p>
      <p><strong>Location:</strong>
        ${user.address?.city || "Unknown"},
        ${user.address?.country || ""}
      </p>

      <button class="btn primary" onclick="goToGallery(${user.id})">
        View Photos
      </button>

    </div>
  `;
}

function goToGallery(id) {
  window.location.href = `gallery.html?id=${id}`;
}
