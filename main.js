const body = document.body
// const cat = document.getElementById('cat-weather')
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
    const cityDescripcion = city.weather[0].description
    const descriptionFirstLetter = cityDescripcion.charAt(0).toUpperCase()
    const remainingLetters = cityDescripcion.slice(1)
    const capitalizedDescription = descriptionFirstLetter + remainingLetters

    return `
        <div class="card">
            <div class="card-ubication">
                <div class="icon-title">
                    <span><svg width="22" height="27" viewBox="0 0 22 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.0002 0.666687C5.40016 0.666687 0.333496 4.96002 0.333496 11.6C0.333496 15.84 3.60016 20.8267 10.1202 26.5734C10.6268 27.0134 11.3868 27.0134 11.8935 26.5734C18.4002 20.8267 21.6668 15.84 21.6668 11.6C21.6668 4.96002 16.6002 0.666687 11.0002 0.666687ZM11.0002 14C9.5335 14 8.3335 12.8 8.3335 11.3334C8.3335 9.86669 9.5335 8.66669 11.0002 8.66669C12.4668 8.66669 13.6668 9.86669 13.6668 11.3334C13.6668 12.8 12.4668 14 11.0002 14Z" fill="white"/>
                        </svg></span>
                    <h3>${city.name}, ${city.sys.country}</h3>
                </div>
                <span><svg  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path data-id="${city.id}" class="close" d="M8 10.4481L13.071 15.5191C13.3916 15.8397 13.7996 16 14.2951 16C14.7905 16 15.1985 15.8397 15.5191 15.5191C15.8397 15.1985 16 14.7905 16 14.2951C16 13.7996 15.8397 13.3916 15.5191 13.071L10.4481 8L15.5191 2.92896C15.8397 2.60838 16 2.20036 16 1.70492C16 1.20947 15.8397 0.801457 15.5191 0.480874C15.1985 0.160291 14.7905 0 14.2951 0C13.7996 0 13.3916 0.160291 13.071 0.480874L8 5.55191L2.92896 0.480874C2.60838 0.160291 2.20036 0 1.70492 0C1.20947 0 0.801457 0.160291 0.480874 0.480874C0.160291 0.801457 0 1.20947 0 1.70492C0 2.20036 0.160291 2.60838 0.480874 2.92896L5.55191 8L0.480874 13.071C0.160291 13.3916 0 13.7996 0 14.2951C0 14.7905 0.160291 15.1985 0.480874 15.5191C0.801457 15.8397 1.20947 16 1.70492 16C2.20036 16 2.60838 15.8397 2.92896 15.5191L8 10.4481Z" fill="white" fill-opacity="0.72"/>
                    </svg>
                </span>
            </div>
            <div class="card-info">
                <div class="temperature">
                    <div class="current-weather">
                        ${convertCelsius(city.main.temp)}º
                    </div>
                    <div class="status">
                        <div class="status-feel">
                            ${capitalizedDescription}
                        </div>
                        <div class="real-feel">
                            ${convertCelsius(city.main.feels_like)}º
                        </div>
                    </div>
                </div>
                <div class="weather-info">
                    <div class="max-weather"><svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.262 0.738432C14.378 0.851437 14.874 1.27813 15.282 1.6756C17.848 4.00585 22.048 10.0848 23.33 13.2664C23.536 13.7496 23.972 14.9713 24 15.624C24 16.2494 23.856 16.8456 23.564 17.4145C23.156 18.1237 22.514 18.6926 21.756 19.0044C21.23 19.2051 19.656 19.5168 19.628 19.5168C17.906 19.8285 15.108 20 12.016 20C9.07 20 6.386 19.8285 4.638 19.5733C4.61 19.5441 2.654 19.2323 1.984 18.8914C0.76 18.266 0 17.0443 0 15.737V15.624C0.03 14.7725 0.79 12.982 0.818 12.982C2.102 9.97175 6.096 4.03312 8.75 1.64637C8.75 1.64637 9.432 0.974184 9.858 0.681929C10.47 0.226011 11.228 0 11.986 0C12.832 0 13.62 0.255236 14.262 0.738432Z" fill="white"/>
                        </svg>
                        Max. ${convertCelsius(city.main.temp_max)}º</div>
                    <div class="min-weather"><svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.738 19.2616C9.622 19.1486 9.126 18.7219 8.718 18.3244C6.152 15.9942 1.952 9.91525 0.67 6.73356C0.464 6.25037 0.028 5.02874 0 4.37604C0 3.75061 0.144 3.15441 0.436 2.58548C0.844 1.87628 1.486 1.30736 2.244 0.995616C2.77 0.794934 4.344 0.483195 4.372 0.483195C6.094 0.171456 8.892 0 11.984 0C14.93 0 17.614 0.171456 19.362 0.426693C19.39 0.455918 21.346 0.767657 22.016 1.10862C23.24 1.73405 24 2.95567 24 4.26303V4.37604C23.97 5.22747 23.21 7.01802 23.182 7.01802C21.898 10.0283 17.904 15.9669 15.25 18.3536C15.25 18.3536 14.568 19.0258 14.142 19.3181C13.53 19.774 12.772 20 12.014 20C11.168 20 10.38 19.7448 9.738 19.2616Z" fill="white"/>
                        </svg>
                        Min. ${convertCelsius(city.main.temp_min)}º</div>
                    <div class="humidity"><svg width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 23C6.50625 23 4.38263 22.1442 2.62913 20.4326C0.875625 18.7209 -0.000749519 16.6372 4.80975e-07 14.1814C4.80975e-07 13.0093 0.229875 11.8886 0.689625 10.8192C1.14938 9.74977 1.80075 8.8054 2.64375 7.98605L7.36719 1.30836C8.16417 0.181638 9.83583 0.18164 10.6328 1.30836L15.3562 7.98605C16.2 8.80465 16.8517 9.74902 17.3115 10.8192C17.7712 11.8893 18.0007 13.01 18 14.1814C18 16.6372 17.1236 18.7209 15.3709 20.4326C13.6181 22.1442 11.4945 23 9 23Z" fill="white"/>
                        </svg>
                        ${city.main.humidity}% Humidity</div>
                </div>
            </div>
        </div>
    `
}

const renderCitiesList = citiesList => {
    cardContainer.innerHTML = citiesList.map(city => renderCity(city)).join('');
};

const timeDBkey = 'AJXKFG9MMZRF'

const renderBasedOnCity = city => {
    console.log(city);
    const rangeNightStart = 19
    const rangeNightFinish = 8

    const nightClear = "#07081D"
    const nightCloudy = "#18202E"
    const dayClear = "#3A120A"
    const dayCloudy = "#3C4D69"
    const snowy = "#053960"
    const rainy = "#0F141E"
    const stormy = "#060D17"

    const nightClearPNG = "./img/nightclear.png"
    const nightCloudyPNG = "./img/nightcloudy.png"
    const dayClearPNG = "./img/dayclear.png"
    const dayCloudyPNG = "./img/daycloudy.png"
    const snowyPNG = "./img/snowy.png"
    const rainyPNG = "./img/rainy.png"
    const stormyPNG = "./img/stormy.png"

    // en esta condición, revisar el clima para seleccionar correctamente el fondo y la imagen

    // city.main TEMP
    // city.weather.main lluvia, nieve, nubes, sol

    if (parseInt(city.localTime) >= rangeNightStart || parseInt(city.localTime) <= rangeNightFinish){
        body.style.backgroundColor = nightClear
        document.getElementById("cat-image").src = nightClearPNG
    }else{
        body.style.backgroundColor = dayClear
        document.getElementById("cat-image").src = dayClearPNG
    }
}

const searchCity = async e => {
    e.preventDefault();
    const searchedCity = cityInput.value.trim();
    if (searchedCity.length === 0 || !/^[A-Za-z\s]*$/.test(searchedCity)) {
        alert('Por favor ingresa una ciudad');
        return;
    }

    const fetchedCity = await requestCity(searchedCity);

    if(!fetchedCity.id) {
        alert('La ciudad ingresada no existe')
        form.reset()
        return}

    const timeZoneResponse = await fetch(
        `http://api.timezonedb.com/v2.1/get-time-zone?key=${timeDBkey}&format=json&by=position&lat=${fetchedCity.coord.lat}&lng=${fetchedCity.coord.lon}`
    )

    const timeZoneData = await timeZoneResponse.json()
    const { formatted } = timeZoneData
    const localTime = new Date(formatted).toLocaleTimeString()

    fetchedCity.localTime = localTime
    
    if(cities.some(city => city.id === fetchedCity.id)){
        const foundIndex = cities.findIndex (el => el.id == fetchedCity.id)
        cities.splice(foundIndex, 1)
        cities.unshift(fetchedCity)
        saveLocalStorage(cities)
        renderCitiesList(cities)
        form.reset()
        renderBasedOnCity(fetchedCity)
        console.log(fetchedCity);
        return
    }

    cities = [fetchedCity, ...cities]
    renderCitiesList(cities)
    saveLocalStorage(cities)
    form.reset()
    
    renderBasedOnCity(fetchedCity)

}

const removeCity = e => {
    if (!e.target.classList.contains('close')) return;
    const filterId = Number(e.target.dataset.id);
    cities = cities.filter(city => city.id !== filterId);
    renderCitiesList(cities);
    saveLocalStorage(cities);
};

const init = () => {
    renderBasedOnCity(cities[0])
    renderCitiesList(cities);
    form.addEventListener('submit', searchCity);
    cardContainer.addEventListener('click', removeCity);
}

init();