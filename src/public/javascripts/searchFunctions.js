const form = document.querySelector("form");
const input = document.querySelector("input");
let updatedContent = document.getElementById("updatedContent");
const el = document.createElement("html");

// Make input cursor active on page load
input.focus();

let timeoutId;
input.addEventListener("input", (e) => {
  handleInputEvent(e);
});

form.addEventListener("submit", (e) => {
  //Prevent page reload
  e.preventDefault();
});

//Function to handle input event
function handleInputEvent(e) {
  //Prevent page reload
  e.preventDefault();

  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  //Delay function until user stops typing
  timeoutId = setTimeout(() => {
    //Get request with input value
    fetch(`/faq?search=${input.value}`)
      .then((response) => response.text())
      .then(function (data) {
        //Parse HTML string
        el.innerHTML = data;
        const content = el.querySelector("#updatedContent");

        //Fade Out Accordian Content
        updatedContent.animate([{ opacity: 1 }, { opacity: 0.5 }], {
          duration: 200,
          iterations: 1,
        });

        setTimeout(() => {
          //Update content with search resutls
          updatedContent.innerHTML = content.innerHTML;

          //Fade In content
          updatedContent.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 550,
            iterations: 1,
          });
        }, 200);
      })
      .catch((error) => console.error(error));
  }, 1000);
}
