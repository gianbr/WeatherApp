const form = document.getElementById('form');
const cityInput = document.querySelector('.search-input');
const cardContainer = document.querySelector('.card-container');

const searchCity = async e => {
    e.preventDefault();
    const searchedCity = cityInput.value.trim();
    if (searchedCity.length === 0) {
        alert('Por favor ingresa una ciudad');
        return;
    }

    const fetchedCity = await requestCity(searchedCity);
    

}

const init = () => {
    form.addEventListener('submit', searchCity);
}

init();