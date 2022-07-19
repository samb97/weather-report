import axios from 'axios'

// Should be moved to .env in real world example
const apiKey = 'deac99ba5a0547f98df171952221907'
const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}`

function useWeatherApi() {
  function getWeatherUsingQuery(query: string) {
    if (! query) {
      return
    }

    return axios.get(`${apiUrl}&q=${query}`)
  }

  return { getWeatherUsingQuery }
}

export { useWeatherApi }