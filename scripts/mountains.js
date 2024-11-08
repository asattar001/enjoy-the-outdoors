"use strict";
const mountainSelect = document.querySelector("#mountainSelect");
const mountainDetails = document.querySelector("#mountainDetails");
const mountainImg = document.querySelector("#mountainImg");
const mountainBody = document.querySelectorAll("h4,p");
const mountainFooter = document.querySelector("#mountainFooter");

async function getSunsetForMountain(lat, lng) {
  let response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
  let data = await response.json();
  return data;
}

function loadMountainSelect() {
  for (const mountain of mountainsArray) {
    const option = new Option(mountain.name, mountain.name);
    mountainSelect.appendChild(option);
  }
}

function toggleStyles(bool) {
  if (bool) {
    mountainDetails.style.display = "block";
    mountainFooter.style.position = "static";
  } else {
    mountainDetails.style.display = "none";
    mountainFooter.style.position = "fixed";
  }
}

async function createMountainDetails(mountain) {
  toggleStyles(true);
  mountainImg.src = `images/${mountain.img}`;
  const time = await getSunsetForMountain(mountain.coords.lat, mountain.coords.lng);
  mountainBody.forEach((elem) => {
    switch (elem.id) {
      case "name":
        elem.textContent = mountain.name;
        break;
      case "elevation":
        elem.textContent = `${mountain.elevation} FT`;
        break;
      case "effort":
        elem.textContent = mountain.effort;
        break;
      case "description":
        elem.textContent = mountain.desc;
        break;
      case "sunrise":
        elem.textContent = `${time.results.sunrise.slice(0, time.results.sunrise.lastIndexOf(":"))} AM`;
        break;
      case "sunset":
        elem.textContent = `${time.results.sunset.slice(0, time.results.sunset.lastIndexOf(":"))} PM`;
        break;
    }
  });
}

loadMountainSelect();

mountainSelect.addEventListener("change", (evt) => {
  const mountain = mountainsArray.find((mtn) => evt.target.value == mtn.name);
  evt.target.value ? createMountainDetails(mountain) : toggleStyles(false);
});
