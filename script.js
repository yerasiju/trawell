const btn = document.getElementById("logout");
btn.addEventListener("click", () => {
  window.location.href = "reg.html";
});

const profile = document.getElementsByClassName("profile");
profile[0].addEventListener("click", () => {
  window.location.href = "profile.html";
});
