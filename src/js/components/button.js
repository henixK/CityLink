import { selectAll } from 'd3-selection';
import { getCityData } from "./api.js";
import { summary } from "./summary.js";
import { worldMap } from "./worldMap.js";

const form = document.getElementById('form');
const searchInput = document.getElementById('search-input');
const categories = document.getElementById('categories');
const info = document.getElementById('info');
const wave = document.getElementById('wave');

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
        summary(cityData);
        worldMap(cityData);

        info.scrollIntoView({ behavior: 'smooth' });
        wave.classList.add('lg:block');
        wave.classList.remove('lg:hidden');
    } catch (error) {
        console.log(error);
    }
}
