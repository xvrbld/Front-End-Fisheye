function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
  }

const form = document.contact;
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Always preventDefault() first
const firstName = document.querySelector(".first").value;
console.log("prénom:",firstName);
const lastName = document.querySelector(".last").value;
console.log("nom:",lastName);
const email = document.querySelector(".email").value;
console.log("email:",email);
}, false);