const key = '649e01487f1e4f0d844915c6d06a8e42'

const requestCity = async (city) => {
    const baseURL = 'https://api.openweathermap.org/data/2.5/weather'
    const query = `?q=${city}&appid=${key}`

    // fetch data
    const response = await fetch(baseURL + query)

    // convert to json
    const data = await response.json()
    return data
}