"use strict";
const mountainSelect = document.querySelector("#mountainSelect");
const mountainDetails = document.querySelector("#mountainDetails");
const mountainImg = document.querySelector("#mountainImg");
const mountainBody = document.querySelectorAll("h4,p");

async function getSunsetForMountain(lat, lng) {
  let response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
  let data = await response.json();
  return data;
}

function loadMountains(params) {
  for (const mountain of mountainsArray) {
    const option = new Option(mountain.name, mountain.name);
    mountainSelect.appendChild(option);

    if (params == mountain.name) params = mountain;
  }
  if (params) createMountainDetails(params);
  params ? (mountainDetails.style.display = "block") : (mountainDetails.style.display = "none");
}

let createMountainDetails = async (mountain) => {
  mountainImg.src = `images/${mountain.img}`;
  const time = await getSunsetForMountain(mountain.coords.lat, mountain.coords.lng);

  mountainBody.forEach((elem) => {
    switch (elem.id) {
      case "name":
        elem.textContent = mountain.name;
        break;
      case "elevation":
        elem.textContent = `Elevation: ${mountain.elevation} FT`;
        break;
      case "effort":
        elem.textContent = `Effort: ${mountain.effort}`;
        break;
      case "description":
        elem.textContent = `Description: ${mountain.desc}`;
        break;
      case "sunrise":
        elem.textContent = `Sunrise: ${time.results.sunrise}`;
        break;
      case "sunset":
        elem.textContent = `Sunset: ${time.results.sunset}`;
        break;
    }
  });
};

mountainSelect.addEventListener("change", (evt) => {
  evt.target.value ? loadMountains(evt.target.value) : mountainDetails.style.display = "none";
});

loadMountains();

