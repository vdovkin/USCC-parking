//convert units UI
function convertUnitsUI(unit){
    if (unit === 'м.куб.'){
        unit = 'м<sup>3</sup>';
    } else if (unit === 'м.кв.'){
        unit = 'м<sup>2</sup>';
    }
    return unit;
}


// Load rates
function loadRates() {
    const xhr = new XMLHttpRequest();
  
    xhr.open('GET', 'data/rates.json', true);
  
    xhr.onload = function(){
      if(this.status === 200) {
        // console.log(this.responseText);
  
        const rates = JSON.parse(this.responseText);
  
        let output = '';
  
        rates.forEach(function(rate){
          output += `
          <tr>
            <th scope='row' class="text-center">${rate.id}</th>
            <td>${rate.name}</td>
            <td class='text-center'>${convertUnitsUI(rate.units)}</td>
            <td>${rate.value}</td>
          </tr>
        `;
        });


  
        document.getElementById('rates').innerHTML = output;
      }
    }
  
    xhr.send();
  }

// Show card with Results
function showResults(){
    const resultsUI = document.getElementById('results');
    if (resultsUI.classList.contains('d-none')){
        resultsUI.classList.remove('d-none');
    }
}

// hide card with Results
function hideResults(){
    const resultsUI = document.getElementById('results');
    if (!resultsUI.classList.contains('d-none')){
        resultsUI.classList.add('d-none');
    }
}