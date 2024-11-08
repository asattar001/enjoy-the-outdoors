"use strict";
const mountainSelect = document.querySelector("#mountainSelect");
const mountainDetails = document.querySelector("#mountainDetails");
const mountainImg = document.querySelector("#mountainImg");
const mountainBody = document.querySelectorAll("h4,p");
const mountainFooter = document.querySelector("#mountainFooter");

// Api to get data on mountain based on coordinates 
async function getSunsetForMountain(lat, lng) {
  let response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
  let data = await response.json();
  return data;
}

// Populates dropdown with mountain names
function loadMountainSelect() {
  for (const mountain of mountainsArray) {
    const option = new Option(mountain.name, mountain.name);
    mountainSelect.appendChild(option);
  }
}

// Changes display if a mountain is slected
function toggleStyles(bool) {
  bool ? mountainDetails.style.display = "block" :  mountainDetails.style.display = "none";
  bool ? mountainFooter.style.position = "static" : mountainFooter.style.position = "fixed";
}

// Displays Mountain Card with the mountain details
async function createMountainDetails(mountain) {
  toggleStyles(true);

  // gets data based on mountain coordinates
  const time = await getSunsetForMountain(mountain.coords.lat, mountain.coords.lng);

  mountainImg.src = `images/${mountain.img}`;
  
  // assigns mountain details to the card 
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

//Initial load of dropdown
loadMountainSelect();

// finds the mountain selected to then show the details
mountainSelect.addEventListener("change", (evt) => {
  const mountain = mountainsArray.find((mtn) => evt.target.value == mtn.name);
  evt.target.value ? createMountainDetails(mountain) : toggleStyles(false);
});
