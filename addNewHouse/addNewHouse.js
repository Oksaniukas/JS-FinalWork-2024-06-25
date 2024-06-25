const btnAdd = document.getElementById("add-btn");
const formWrapper = document.getElementById("form-wrapper");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const location = document.getElementById("location");
const area = document.getElementById("area");
const condition = document.getElementById("condition");
const floors = document.getElementById("floors");
const houseImg = document.getElementById("houseImg");

btnAdd.addEventListener("click", () => {
  const priceValue = Number(price.value);
  const areaValue = Number(area.value);
  const floorsValue = Number(floors.value);

  if (!priceValue || !areaValue || !floorsValue) {
    return alert("Price, Area anf Floor Values must be a  Number");
  }

  const urlRegex =
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  const isBadUrl = () => !urlRegex.test(houseImg.value);
  if (isBadUrl()) {
    alert("Bad URL image");
    return;
  }

  const house = {
    title: title.value,
    price: price.value,
    description: description.value,
    location: location.value,
    area: area.value,
    condition: condition.value,
    floors: floors.value,
    houseImg: houseImg.value,
  };

  const addIsSuccess = document.createElement("div");
  addIsSuccess.textContent = "New Modular House was add successfully!!!";
  addIsSuccess.setAttribute("class", "add-success");
  formWrapper.append(addIsSuccess);

  fetch("https://665f591e1e9017dc16f3db59.mockapi.io/houses", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(house),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
    });
});
