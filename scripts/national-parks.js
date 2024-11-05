const headers = document.querySelectorAll("th");
const tableBody = document.querySelector("#tableBody");
const parkByStateSelect = document.querySelector("#parkByStateSelect");
const parkByTypeSelect = document.querySelector("#parkByTypeSelect");

function loadSelectOptions (array, selectElement) {
  for (const item of array) {
    const option = new Option(item, item);
    selectElement.appendChild(option);
  }
};

function addWebsite (visit, park) {
  const anchor = document.createElement("a");
  const url = park[visit] || `https://www.nps.gov/${park.LocationID.toLocaleLowerCase()}/index.htm`;
  anchor.textContent = "Visit Here";
  anchor.href = url;
  anchor.target = "_blank";
  return anchor;
};

function filterArray(state, type) {
  tableBody.textContent = "";
  return nationalParksArray.filter((park) => {
    let checkState = state ? state == park.State : true;
    let checkType = type ? park.LocationName.includes(type) : true;
    return checkState && checkType;
  });
}

function loadParks(nationalParks = nationalParksArray) {
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
}


loadSelectOptions(locationsArray, parkByStateSelect);
loadSelectOptions(parkTypesArray, parkByTypeSelect);
loadParks();

parkByStateSelect.addEventListener("change", () =>
  loadParks(filterArray(parkByStateSelect.value, parkByTypeSelect.value))
);

parkByTypeSelect.addEventListener("change", () => {
  loadParks(filterArray(parkByStateSelect.value, parkByTypeSelect.value));
});
