const USD = 28.4;

let parkingRates = "";
let parkingValues = "";

loadRates((response) => {
  parkingRates = JSON.parse(response);
});

loadValues((response) => {
  parkingValues = JSON.parse(response);
});

// Load Rates
function loadRates(callback) {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "data/rates.json", true);

  xhr.onload = function () {
    if (this.status === 200) {
      callback(this.responseText);
    }
  };

  xhr.send(null);
}

// Load values
function loadValues(callback) {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "data/values.json", true);

  xhr.onload = function () {
    if (this.status === 200) {
      callback(this.responseText);
    }
  };

  xhr.send();
}

// Show card with Results
function Results() {
  // Show loader
  document.getElementById('loading').classList.remove('d-none');
  mainCalculation();
  setTimeout(showResults, 500);
}

function showResults(){
  document.getElementById('loading').classList.add('d-none');
  const resultsUI = document.getElementById("results");
  if (resultsUI.classList.contains("d-none")) {
    resultsUI.classList.remove("d-none");
  }
}


// hide card with Results
function hideResults(){
    const resultsUI = document.getElementById('results');
    if (!resultsUI.classList.contains('d-none')){
        resultsUI.classList.add('d-none');
    }
}

function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function parkingSpacesCalc(addedSections, removedFlors) {
  const delta_section =
    (parkingValues.parkingSpaces[0].value2 -
      parkingValues.parkingSpaces[0].value1) /
    5;
  const parkingSpacesNew = Math.round(
    ((parkingValues.parkingSpaces[0].value1 + addedSections * delta_section) /
      4) *
      (4 - removedFlors)
  );
  return parkingSpacesNew;
}

function metalVeightCalc(addedSections, removedFlors) {
  const delta_section =
    (parkingValues.quantitativeValues[5].value2 -
      parkingValues.quantitativeValues[5].value1) /
    5;
  const metalVeightNew = Math.round(
    ((parkingValues.quantitativeValues[5].value1 +
      addedSections * delta_section) /
      4) *
      (4 - removedFlors)
  );
  return metalVeightNew;
}

function costCalc(addedSections, removedFlors) {
  let totalCost = 0;

  parkingValues.quantitativeValues.forEach(function (parametr) {
    let rate = parkingRates.find((x) => x.id === parametr.id).value;

    let deltaSection = (parametr.value2 - parametr.value1) / 5;

    let newValue =
      ((parametr.value1 + addedSections * deltaSection) / 4) *
      (4 - removedFlors);

    totalCost += newValue * rate;

    if ((parametr.id === 1) | (parametr.id === 2)) {
      totalCost += newValue * rate * 0.3;
    }
  });

  parkingValues.costValues.forEach(function (parametr) {
    let deltaSection = (parametr.value2 - parametr.value1) / 5;

    let newValue =
      ((parametr.value1 + addedSections * deltaSection) / 4) *
      (4 - removedFlors);

    totalCost += newValue;
  });

  totalCost += 20000 * USD;

  totalCost *= 1.15;

  return Math.round(totalCost);
}

function mainCalculation() {
  const lenght = document.getElementById("lenght").value;
  const floors = document.getElementById("floors").value;

  const addedSections = (lenght - 48) / 8;
  const removedFlors = 4 - floors;

  const parkingSpacesNew = parkingSpacesCalc(addedSections, removedFlors);
  document.getElementById("parkingSpaces").innerText = parkingSpacesNew;

  const totalCost = costCalc(addedSections, removedFlors);
  document.getElementById("parkingСostGRN").innerText = numberWithSpaces(
    totalCost
  );
  document.getElementById("parkingСostUSD").innerText = numberWithSpaces(
    Math.round(totalCost / USD)
  );
  document.getElementById("parkingSpaceСostGRN").innerText = numberWithSpaces(
    Math.round(totalCost / parkingSpacesNew)
  );
  document.getElementById("parkingSpaceСostUSD").innerText = numberWithSpaces(
    Math.round(totalCost / (USD * parkingSpacesNew))
  );

  const metalVeightNew = metalVeightCalc(addedSections, removedFlors);
  document.getElementById("metalVeight").innerText = metalVeightNew;

  const metalConsumptionNew = (
    (metalVeightNew / (lenght * 35 * floors)) *
    1000
  ).toFixed(2);
  document.getElementById("metalСonsumption").innerText = metalConsumptionNew;
}
