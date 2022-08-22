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
  let formData = new FormData(this);
  let object = {};
  formData.forEach((value, key) => {
    object[key] = value
  });
  let json = JSON.stringify(object);
  console.log(json);
}, false);