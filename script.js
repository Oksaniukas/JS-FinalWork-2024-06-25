const cardsWrapper = document.getElementById("cards-wrapper");

const cityKaunasFiltered = document.getElementById("kaunas-city");
const cityVilniusFiltered = document.getElementById("vilnius-city");
const cityUtenaFiltered = document.getElementById("utena-city");
const cityPalangaFiltered = document.getElementById("palanga-city");
const cityAllFiltered = document.getElementById("all-cities");

const usedFiltered = document.getElementById("used-condition");
const newFiltered = document.getElementById("new-condition");
const allFiltered = document.getElementById("all-condition");

const buildCards = (houses) => {
  cardsWrapper.innerHTML = "";

  houses.forEach((h) => {
    const card = document.createElement("a");
    card.setAttribute("class", "card");
    card.href = `../houseInfo/houseInfo.html?id=${h.id}`;

    const title = document.createElement("h4");
    title.textContent = h.title;
    title.setAttribute("class", "title");

    const price = document.createElement("h3");
    price.textContent = `${h.price}€`;
    price.setAttribute("class", "price");

    const condition = document.createElement("p");
    condition.textContent = "Condition: " + h.condition;
    condition.setAttribute("class", "card-text");

    const area = document.createElement("p");
    area.textContent = "Area: " + `${h.area} m2`;
    area.setAttribute("class", "card-text");

    const location = document.createElement("p");
    location.textContent = h.location;
    location.setAttribute("class", "card-text");

    const houseImgWrapper = document.createElement("div");
    houseImgWrapper.setAttribute("class", "img-wrapper");
    const houseImg = document.createElement("img");
    houseImg.src = h.houseImg;
    houseImg.setAttribute("class", "img");

    houseImgWrapper.append(houseImg);
    card.append(houseImgWrapper, title, price, condition, area, location);
    cardsWrapper.append(card);
  });
};

const fetchAllHouses = async () => {
  try {
    const response = await fetch(
      "https://665f591e1e9017dc16f3db59.mockapi.io/houses"
    );
    const houses = await response.json();
    return houses;
  } catch (err) {
    console.log(err);
  }
};

const houses = await fetchAllHouses();
buildCards(houses.sort((a, b) => a.price - b.price));

console.log(houses);

/////FILTER cities///////////////////////
cityKaunasFiltered.addEventListener("click", () => {
  const cityKaunas = houses.filter((h) => h.location === "Kaunas");
  console.log(cityKaunas);
  buildCards(cityKaunas);
});
cityVilniusFiltered.addEventListener("click", () => {
  const cityVilnius = houses.filter((h) => h.location === "Vilnius");
  buildCards(cityVilnius);
});
cityPalangaFiltered.addEventListener("click", () => {
  const cityPalanga = houses.filter((h) => h.location === "Palanga");
  buildCards(cityPalanga);
});
cityUtenaFiltered.addEventListener("click", () => {
  const cityUtena = houses.filter((h) => h.location === "Utena");
  buildCards(cityUtena);
});
cityAllFiltered.addEventListener("click", () => {
  buildCards(houses);
});

const burgerBtn = document.getElementById("burger-btn");
const mobileNav = document.getElementById("mobile-nav");

burgerBtn.addEventListener("click", () => {
  mobileNav.classList.toggle("active");
});

/////FILTER condition///////////////////////

newFiltered.addEventListener("click", () => {
  const newHouses = houses.filter((h) => h.condition === "New");
  console.log(newHouses);
  buildCards(newHouses);
});

usedFiltered.addEventListener("click", () => {
  const usedHouses = houses.filter((h) => h.condition === "Used");
  console.log(usedHouses);
  buildCards(usedHouses);
});

allFiltered.addEventListener("click", () => {
  buildCards(houses);
  console.log(houses);
});

/*/********SEARCH/*/
const input = document.querySelector("input");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", () => {
  const inputText = input.value.toLowerCase();
  console.log(inputText);
  const filteredHouses = houses.filter((house) =>
    house.title.toLowerCase().includes(inputText)
  );
  console.log(filteredHouses);
  if (filteredHouses.length > 0) {
    buildCards(filteredHouses);
  } else {
    alert("No houses found");
  }
});
