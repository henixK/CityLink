import { selectAll } from 'd3-selection';
import { getCityData } from "./api.js";
import { summary } from "./summary.js";
import { worldMap } from "./worldMap.js";
import { barChart } from './barChart.js';
import { overall } from './overallScore.js';

const form = document.getElementById('form');
const searchInput = document.getElementById('search-input');
const categories = document.getElementById('categories');
const info = document.getElementById('info');
const wave = document.getElementById('wave');
const errore = document.getElementById('error')

form.addEventListener('submit', searchCity);

export async function searchCity(event) {
    event.preventDefault();
    selectAll("svg").remove();

    const city = searchInput.value;

    info.classList.remove('hidden');
    info.classList.add('block');
    categories.classList.remove('hidden');
    categories.classList.add('block');

    await generateCityData(city);
}

async function generateCityData(city) {
    try {
        const cityData = await getCityData(city);
        barChart(cityData);
        overall(cityData);
        summary(cityData);
        worldMap(cityData);

        info.scrollIntoView({ behavior: 'smooth' });
        wave.classList.add('lg:block');
        wave.classList.remove('lg:hidden');
    } catch (error) {
        const screenSize = window.innerWidth;
        if (screenSize < 600) {
            errore.textContent = "City not found. ";
        } else {
            errore.textContent = "City not found. Please enter a valid city name.";
        }
        info.classList.add('hidden');
        categories.classList.add('hidden');
    }
}

window.addEventListener('scroll', function() {
    if(window.scrollY >100) {
        wave.classList.remove("lg:hidden")
        wave.classList.add("lg:block")
    }
    else {
        wave.classList.remove("lg:block")
        wave.classList.add("lg:hidden")
    }
});