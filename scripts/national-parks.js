const headers = document.querySelectorAll("th");
const tableBody = document.querySelector("#tableBody");
const parkByStateSelect = document.querySelector("#parkByStateSelect");
const parkByTypeSelect = document.querySelector("#parkByTypeSelect");

// Populates dropdown based on location or type
function loadSelectOptions (array, selectElement) {
  for (const item of array) {
    const option = new Option(item, item);
    selectElement.appendChild(option);
  }
};

// Makes a link to visit park website
function addWebsite (visit, park) {
  const anchor = document.createElement("a");
  const url = park[visit] || `https://www.nps.gov/${park.LocationID.toLocaleLowerCase()}/index.htm`;
  anchor.textContent = "Visit Here";
  anchor.href = url;
  anchor.target = "_blank";
  anchor.style.textDecoration = "none"
  return anchor;
};

// Having both location and park type filter work simulatenously
function filterArray(state, type) {
  tableBody.textContent = "";
  return nationalParksArray.filter((park) => {
    let checkState = state ? state == park.State : true;
    let checkType = type ? park.LocationName.includes(type) : true;
    return checkState && checkType;
  });
}

// Creates a table based on original / filtered data
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

// Initially loads dropdowns and park table
loadSelectOptions(locationsArray, parkByStateSelect);
loadSelectOptions(parkTypesArray, parkByTypeSelect);
loadParks();

// Reload table with filtered data
parkByStateSelect.addEventListener("change", () =>
  loadParks(filterArray(parkByStateSelect.value, parkByTypeSelect.value))
);

// Reload table with filtered data
parkByTypeSelect.addEventListener("change", () => {
  loadParks(filterArray(parkByStateSelect.value, parkByTypeSelect.value));
});
