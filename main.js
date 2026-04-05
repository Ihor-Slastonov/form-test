console.log("hELLO");

const handleSubmit = (e) => {
  e.preventDefault();

  const myForm = e.target;

  const formData = new FormData(myForm);
  console.log(formData);
  const toStr = new URLSearchParams(formData).toString();
  console.log(toStr);

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => console.log("Form successfully submitted"))
    .catch((error) => alert(error));
};

document.querySelector("form").addEventListener("submit", handleSubmit);
