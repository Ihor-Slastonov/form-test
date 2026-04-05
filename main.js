// console.log("hELLO");

// const handleSubmit = (e) => {
//   e.preventDefault();

//   const myForm = e.target;

//   const formData = new FormData(myForm);
//   console.log(formData);
//   const toStr = new URLSearchParams(formData).toString();
//   console.log(toStr);

//   fetch("/", {
//     method: "POST",
//     headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     body: new URLSearchParams(formData).toString(),
//   })
//     .then(() => console.log("Form successfully submitted"))
//     .catch((error) => alert(error));
// };

// document.querySelector("form").addEventListener("submit", handleSubmit);
const form = document.querySelector("#tg-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: document.querySelector("#username").value,
    phone: document.querySelector("#telephone").value,
  };

  try {
    const response = await fetch("/.netlify/functions/send-tg", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Заявка улетела в Telegram!");
      form.reset();
    } else {
      alert("Что-то пошло не так...");
    }
  } catch (err) {
    console.error("Ошибка:", err);
  }
});