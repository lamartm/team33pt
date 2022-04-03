const selectCountry = document.querySelector('#userCountry');
const selectRegion = document.querySelector('#userRegion');
const restCountriesApi_url = "https://restcountries.com/v2/all";

async function getCountries() {
    const response = await fetch(restCountriesApi_url);
    const data = await response.json();
    let output = "";

    data.forEach(country => {
        output += `<option>${country.name}</option>`;
    })

    selectCountry.innerHTML = output;
}

 document.addEventListener('DOMContentLoaded', getCountries);
