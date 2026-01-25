const usersDiv = document.getElementById("usersDiv");
const skeleton = document.getElementById("skeleton");

function createSkeletonCards(count) {
  skeleton.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const card = document.createElement("div");
    card.className = "skeleton-card";

    const img = document.createElement("div");
    img.className = "skeleton-img";

    const line1 = document.createElement("div");
    line1.className = "skeleton-text";

    const line2 = document.createElement("div");
    line2.className = "skeleton-text";

    card.append(img, line1, line2);
    skeleton.appendChild(card);
  }
}

function showSkeleton() {
  skeleton.style.display = "grid";
}

function hideSkeleton() {
  skeleton.style.display = "none";
}

async function displayUsers() {

  createSkeletonCards(50);

  const fetchedUsers = await fetchUsers();
const fetchedImages = await fetchImages();

if (!fetchedUsers || !fetchedImages) return;

// ✅ cache data
localStorage.setItem("cachedUsers", JSON.stringify(fetchedUsers.data));
localStorage.setItem("cachedImages", JSON.stringify(fetchedImages.data));

  const usersArray = fetchedUsers.data;
  const imagesArray = fetchedImages.data;

  //for (const user of usersArray) 
  usersArray.forEach((user, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "user-card";
    wrapper.role = "button";
    wrapper.tabIndex = 0;

    const img = document.createElement("img");
   //const baseUrl =
   // imagesArray[usersArray.indexOf(usersObj) % imagesArray.length].url;
   
    const baseUrl = imagesArray[index % imagesArray.length].url;
    img.src = `${baseUrl}?random=${user.id || Math.random()}`;
    img.alt = `${user.firstname} ${user.lastname}`;

    const fullName = document.createElement("h3");
    fullName.textContent = `${user.firstname} ${user.lastname}`;

    const gender = document.createElement("p");
    gender.textContent = user.gender;

    const email = document.createElement("p");
    email.className = "email";
    email.title = user.email;
    email.textContent = user.email;

    wrapper.addEventListener("click", () => {
      window.location.href = `profile.html?id=${user.id}`;
    });

    wrapper.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        window.location.href = `profile.html?id=${user.id}`;
      }
    });

    wrapper.append(img, fullName, gender, email);
    usersDiv.appendChild(wrapper);

  });
}

const user = JSON.parse(localStorage.getItem("user"));
if (user) {
  document.getElementById("userInfo").textContent =
    `Welcome, ${user.firstName}!`;
}


displayUsers();
