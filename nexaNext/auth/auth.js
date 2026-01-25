/* ========================
   FAKE DATABASE
======================== */

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function loginUser(user) {
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("user", JSON.stringify(user));
}

function logoutUser() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("user");
  window.location.href = "./auth/login.html";
}

function isLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true";
}

(function seedFakeUsers() {
  if (!localStorage.getItem("users")) {
    saveUsers([
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: "123456",
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        password: "password",
      },
    ]);
  }
})();


function protectPage() {
  if (!isLoggedIn()) {
    window.location.href = "./auth/login.html";
  }
}

function redirectIfLoggedIn() {
  if (isLoggedIn()) {
    window.location.href = "../index.html";
  }
}


function handleLogin(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    const users = getUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      alert("Invalid email or password");
      return;
    }

    loginUser(user);
    window.location.href = "../index.html";
  });
}


function handleRegister(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!firstName || !lastName || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    const users = getUsers();

    if (users.some((u) => u.email === email)) {
      alert("Email already exists");
      return;
    }

    const newUser = {
      id: Date.now(),
      firstName,
      lastName,
      email,
      password,
    };

    users.push(newUser);
    saveUsers(users);

    loginUser(newUser);
    window.location.href = "../index.html";
  });
}

