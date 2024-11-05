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

let addWebsite = (visit, park) => {
  const anchor = document.createElement("a");
  const url = park[visit] || `https://www.nps.gov/${park.LocationID.toLocaleLowerCase()}/index.htm`;
  anchor.textContent = url;
  anchor.href = url;
  anchor.target = "_blank";
  return anchor;
};

let loadParks = (nationalParks = nationalParksArray) => {
  for (const park of nationalParks) {
    let row = document.createElement("tr");

    headers.forEach((header) => {
      let cell = document.createElement("td");

      if (header.id == "Visit") {
        cell.appendChild(addWebsite(header.id, park));
      } else {
        cell.textContent = park[header.id] || "N/A";
      }

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
  const filteredNationalParks = nationalParksArray.filter((park) => evt.target.value == park.State);

  evt.target.value ? loadParks(filteredNationalParks) : loadParks();
});

parkByTypeSelect.addEventListener("change", (evt) => {
  parkByStateSelect.value = "";
  tableBody.textContent = "";
  const filteredNationalParks = nationalParksArray.filter((park) => park.LocationName.includes(evt.target.value));

  evt.target.value ? loadParks(filteredNationalParks) : loadParks();
});
