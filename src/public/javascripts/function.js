const accordion = document.querySelector(".accordion");

accordion.addEventListener("click", (e) => {
  e.target.classList.toggle("active");
  e.target.nextElementSibling.classList.toggle("active");
});
