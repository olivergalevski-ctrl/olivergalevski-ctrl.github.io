const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const header = document.getElementById("header");
const toggleWrapper = document.getElementById("theme-wrapper");
const footer = document.getElementById("footer");

function setLoading(isLoading) {
  if (isLoading) {
    header.style.display = "none";
    toggleWrapper.style.display = "none";
    footer.style.display = "none";
    loading.style.display = "block";
    showSkeleton();
  } else {
    loading.style.display = "none";
    hideSkeleton();
  }
}

function setUI() {
   header.style.display = "";
    toggleWrapper.style.display = "";
    footer.style.display = "";
    hideSkeleton();
}

async function fetchUsers() {
  setLoading(true);
  errorDiv.textContent = "";

  const response = await fetch(
    "https://fakerapi.it/api/v1/persons?_quantity=50",
  );

  if (!response.ok) {
    setLoading(false);
    errorDiv.textContent = "Failed to fetch users";
    return null;
  }

  const data = await response.json();
  setLoading(false);
  setUI();

  return data;
}

async function fetchImages() {
  setLoading(true);
  const response = await fetch(
    "https://fakerapi.it/api/v1/images?_quantity=12",
  );

  if (!response.ok) {
    setLoading(false);
    errorDiv.textContent = "Failed to fetch images";
    return null;
  }

  const data = await response.json();
  setLoading(false);
  setUI();
  
  return data;
}
