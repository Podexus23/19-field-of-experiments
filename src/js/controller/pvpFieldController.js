export default function (field, model, view) {
  const hugButton = field.querySelector(".fight-btn");

  field.addEventListener("click", (e) => {
    console.log(e);
  });
  console.log(hugButton);
}
