const headers = document.querySelectorAll("th");
const tableBody = document.querySelector("#tableBody");
const parkByStateSelect = document.querySelector("#parkByState");
const parkByTypeSelect = document.querySelector("#parkByType");

let loadSelectOptions = (array, selectElement) => {
  for (const item of array) {
    const option = new Option(item, item);
    selectElement.appendChild(option);
  }
};

let loadParks = (nationalParks = nationalParksArray) => {
  console.log(nationalParks[0])
  for (const park of nationalParks) {
    let row = document.createElement("tr");
    headers.forEach((header) => {
      let cell = document.createElement("td");

      park[header.id] ? (cell.textContent = park[header.id]) : (cell.textContent = "N/A");

      row.appendChild(cell);
    });
    tableBody.appendChild(row);
  }
};

loadSelectOptions(locationsArray, parkByStateSelect);
loadSelectOptions(parkTypesArray, parkByTypeSelect);
loadParks();

parkByStateSelect.addEventListener("change", (evt) => {
  parkByTypeSelect.value = "";
  tableBody.textContent = "";
  const filteredNationalParks = nationalParksArray.filter((park) => evt.target.value == park.State)

  evt.target.value ? loadParks(filteredNationalParks) : loadParks();
});

parkByTypeSelect.addEventListener("change", (evt) => {
  parkByStateSelect.value = "";
  tableBody.textContent = "";
  const filteredNationalParks = nationalParksArray.filter((park) => park.LocationName.includes(evt.target.value))

  evt.target.value ? loadParks(filteredNationalParks) : loadParks();
});
