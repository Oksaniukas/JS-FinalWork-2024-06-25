const main = document.getElementById("main");
const houseWrapper = document.getElementById("house-wrapper");
const title = document.getElementById("title");
const img = document.getElementById("img");
const description = document.getElementById("description");
const price = document.getElementById("price");
const location = document.getElementById("location");
const area = document.getElementById("area");
const condition = document.getElementById("condition");
const floors = document.getElementById("floors");
const deleteButton = document.getElementById("delete-btn");

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const fetchHouseById = async () => {
  try {
    const response = await fetch(
      `https://665f591e1e9017dc16f3db59.mockapi.io/houses/${id}`
    );
    const house = await response.json();
    return house;
  } catch (err) {
    console.log(err);
  }
};

const deleteHouse = async (houseId) => {
  try {
    const response = await fetch(
      `https://665f591e1e9017dc16f3db59.mockapi.io/houses/${houseId}`,
      {
        method: "DELETE",
      }
    );
    await response.json();

    console.log("Card was removed");

    //  setTimeout(() => {
    //    window.location.replace("../index.html");
    //  }, 2000);

    const houseWasDeleted = document.createElement("div");
    houseWasDeleted.textContent = "Modular House was deleted";
    houseWasDeleted.setAttribute("class", "house-delete-text");
    main.append(houseWasDeleted);
    houseWrapper.style.display = "none";
    deleteButton.style.display = "none";
  } catch (err) {
    console.log(err);
  }
};

const house = await fetchHouseById();

title.textContent = house.title;
img.src = house.houseImg;
description.textContent = house.description;
price.textContent = `${house.price} €`;
location.textContent = house.location;
area.textContent = `${house.area} m2`;
condition.textContent = house.condition;
floors.textContent = house.floors;

deleteButton.addEventListener("click", () => deleteHouse(id));

