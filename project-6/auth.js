// Simple front-end auth (localStorage-based)

document.addEventListener("DOMContentLoaded", () => {
  
  // SIGNUP
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("signupName").value;
      const email = document.getElementById("signupEmail").value;
      const password = document.getElementById("signupPassword").value;

      localStorage.setItem("user", JSON.stringify({ name, email, password }));

      alert("Account created! Please log in.");
      window.location.href = "login.html";
    });
  }

  // LOGIN
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      const savedUser = JSON.parse(localStorage.getItem("user"));

      if (!savedUser) {
        alert("No account found. Please sign up first.");
        return;
      }

      if (email === savedUser.email && password === savedUser.password) {
        // Login successful
        localStorage.setItem("loggedIn", "true");
        alert("Login successful!");
        window.location.href = "index.html"; // resume builder
      } else {
        alert("Incorrect email or password!");
      }
    });
  }
});
