<script setup lang="ts">
import { ref } from 'vue'
import { useWeatherApi } from './composables/weather-api'
import dayjs from 'dayjs'

interface WeatherApiResponse {

  // In production these should *not* really be 'any' but this public api is massive
  current: any;
  location: any;
}

const query = ref<string>('')
const weather = ref<WeatherApiResponse | null>(null)

async function getWeather() {
  const { getWeatherUsingQuery } = useWeatherApi()
  const { data } = await getWeatherUsingQuery(query.value)
  weather.value = data
}
</script>

<template>
  <div>
    <div class="container mx-auto px-2 space-y-2 py-4 mb-12">
      <h1 class="text-5xl font-bold">Weather Report</h1>
      <p>A weather reporting tool that utilises the WeatherAPI and is built with Vite + Vue 3 + TypeScript & Tailwind.</p>
    </div>
    <div class="container mx-auto px-2 space-y-2 mb-12">
      <p class="text-2xl">"What's the weather like then?"</p>
      <div class="flex items-center space-x-4">
        <div>
          <p>Check the weather in:</p>
          <p class="text-sm italic">Try a postcode, zipcode or your city/village.</p>
        </div>
        <form
          class="flex items-stretch"
          @submit.prevent="getWeather"
        >
          <input
            type="text"
            class="p-4 leading-tight rounded-md rounded-br-none rounded-tr-none mx-w-full w-80"
            placeholder="Paris, London, Amsterdam etc."
            v-model="query"
          />
          <button
            type="submit"
            class="bg-blue-700 p-4 rounded-md rounded-tl-none rounded-bl-none font-bold text-xl"
          >
            GO
          </button>
        </form>
      </div>
    </div>
    <div
      v-if="weather"
      class="container mx-auto px-2 space-y-2"
    >
      <div>
        <div class="text-left inline-block border border-white rounded-xl bg-slate-900 text-white p-4">
          <div class="flex items-center space-x-2">
            <img
              :src="weather.current.condition.icon"
            />
            <div>
              <h2 class="text-2xl leading-tight">
                {{ weather.current.condition.text }}
              </h2>
              <h2 class="text-4xl font-bold leading-tight">
                {{ weather.current.temp_c }}<span class="text-xl font-normal">&deg;c</span> / {{ weather.current.temp_f }}<span class="text-xl font-normal">&deg;f</span>
              </h2>
              <div>
                <h2 class="text-2xl">
                  {{ weather.location.name }}, {{ weather.location.country }}
                </h2>
                <h3>
                  <span class="text-lg align-top">
                    at
                  </span>
                  <span class="text-4xl font-bold text-orange-300">
                    {{ dayjs(weather.current.last_updated).format('HH:mm') }}
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
