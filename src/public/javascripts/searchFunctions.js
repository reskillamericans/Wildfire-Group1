const input = document.querySelector("input");
const lis = document.querySelectorAll("li");

//Clear sessionStorage when user goes to another link
lis.forEach((li) => {
  li.addEventListener("click", () => {
    sessionStorage.clear();
  });
});

//Make sure input cursor is at the end of input text on reload
window.onload = function () {
  const end = input.value.length;
  input.setSelectionRange(end, end);
  input.focus();

  //Set input.value to latest value stored in session on reload
  input.value = sessionStorage.getItem("iVal");
};

let timeoutId;
input.addEventListener("input", (e) => {
  //Reload page with all FAQs when deleting input text
  if (!e.currentTarget.value) {
    sessionStorage.setItem("iVal", "");
    window.location.href = `${window.location.origin}/faq`;
  }

  //Delay search query until user stops typing for one second
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    window.location.href = `${window.location.origin}/faq?search=${input.value}`;
  }, 1000);
  sessionStorage.setItem("iVal", input.value);
});
