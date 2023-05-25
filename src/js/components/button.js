import * as d3 from 'd3';
import {getCityData } from "./api.js";
import { summary } from "./summary.js";
import { worldMap } from "./worldMap.js";
import { barChart } from './barChart.js';
import { overall } from './overallScore.js';


const form = document.getElementById('form');
form.addEventListener('submit', searchCity);

export async function searchCity(event) {
    event.preventDefault();
    d3.selectAll("svg").remove();

    const searchInput = document.getElementById('search-input');
    const categories = document.getElementById('categories')
    const city = searchInput.value;
    const info = document.getElementById('info');
    info.classList.remove('hidden');
    info.classList.add('block');
    categories.classList.remove('hidden');
    categories.classList.add('block');
    info.scrollIntoView({ behavior: 'smooth' });

    try {
        const cityData = await getCityData(city);
        summary(cityData);
        worldMap(cityData);
    } catch (error) {
        console.log(error);
    }
}
