import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBhiqx6QETO5ur3fWwFbx1WaAe04fIj13M",
  authDomain: "project-6777621360736091415.firebaseapp.com",
  projectId: "project-6777621360736091415",
  storageBucket: "project-6777621360736091415.firebasestorage.app",
  messagingSenderId: "193225024231",
  appId: "1:193225024231:web:f754dae735ebdeba9cf842",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const tabs = document.querySelectorAll(".tab");
const message = document.getElementById("message");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    if (tab.dataset.tab === "login") {
      loginForm.style.display = "block";
      registerForm.style.display = "none";
    } else {
      loginForm.style.display = "none";
      registerForm.style.display = "block";
    }
    message.style.display = "none";
  });
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showMessage("Logged in successfully!", "success");
      window.location.href = "/index.html";
    })
    .catch((error) => {
      showMessage(error.message, "error");
    });
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    showMessage("Passwords do not match!", "error");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showMessage("Registration successful!", "success");
    })
    .catch((error) => {
      showMessage(error.message, "error");
    });
});

function showMessage(text, type) {
  message.textContent = text;
  message.className = `message ${type}`;
  message.style.display = "block";
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user.email);
  } else {
    console.log("User is signed out");
  }
});
