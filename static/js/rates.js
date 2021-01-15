//convert units UI
function convertUnitsUI(unit) {
    if (unit === "м.куб.") {
      unit = "м<sup>3</sup>";
    } else if (unit === "м.кв.") {
      unit = "м<sup>2</sup>";
    }
    return unit;
  }


// show Rates
function showRates() {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "data/rates.json", true);

  xhr.onload = function () {
    if (this.status === 200) {
      // console.log(this.responseText);

      const parkingRates = JSON.parse(this.responseText);

      let output = "";

      parkingRates.forEach(function (rate) {
        output += `
            <tr>
              <th scope='row' class="text-center">${rate.id}</th>
              <td>${rate.name}</td>
              <td class='text-center'>${convertUnitsUI(rate.units)}</td>
              <td>${rate.value}</td>
            </tr>
          `;
      });

      document.getElementById("rates").innerHTML = output;
    }
  };
  xhr.send();
}

showRates();