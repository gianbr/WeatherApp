const form = document.getElementById('form');
const cityInput = document.querySelector('.search-input');
const cardContainer = document.querySelector('.card-container');

let cities = JSON.parse(localStorage.getItem('cities')) || [];

const saveLocalStorage = citiesList => {
    localStorage.setItem('cities', JSON.stringify(citiesList));
};

const convertCelsius = kelvin => {
    let celsius = Math.round(kelvin - 273.15);
    return celsius;
};

const renderCity = city => {

}

const renderCitiesList = citiesList => {
    cardContainer.innerHTML = citiesList.map(city => renderCity(city)).join('');
};

const searchCity = async e => {
    e.preventDefault();
    const searchedCity = cityInput.value.trim();
    if (searchedCity.length === 0) {
        alert('Por favor ingresa una ciudad');
        return;
    }

    const fetchedCity = await requestCity(searchedCity);
    
    if(!fetchedCity.id) {
        alert('La ciudad ingresada no existe')
        form.reset()
        return
    }else if(cities.some(city => city.id === fetchedCity.id)){
        alert('Ya estamos mostrando el clima de esa ciudad')
        form.reset()
        return
    }

    console.log(fetchedCity);
    cities = [fetchedCity, ...cities]
    renderCitiesList(cities)
    saveLocalStorage(cities)
    form.reset()

}

const removeCity = e => {
    // Si lo que estamos clickeando NO CONTIENE la clase close, que no haga nada retorna.
    if (!e.target.classList.contains('close')) return;
    //   Si no pasa esto
    //   Guardamos el data-id (Ese data-id es el id de la ciudad.) de las x en una variable
    const filterId = Number(e.target.dataset.id);
    //   console.log(`Este es el dataset de la x: ${filterId}`);
    //  Preguntamos si queremos eliminar con un window.confirm
      // Filtramos la ciudad del array, me saca la ciudad que estoy clickeando (que quiero borrar) y me deja las demas.
      cities = cities.filter(city => city.id !== filterId);
      // Renderizamos, guardamos el ls y verificamos el mensaje ese
      renderCitiesList(cities);
      saveLocalStorage(cities);
      hideWaitMsg(cities);
  };

const init = () => {
    renderCitiesList(cities);
    form.addEventListener('submit', searchCity);
}

init();