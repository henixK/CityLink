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

// Event listener for the form submission
form.addEventListener('submit', searchCity);

// Function to handle city search
export async function searchCity(event) {
    event.preventDefault();
    selectAll("svg").remove(); // Remove any existing SVG elements from the DOM

    const city = searchInput.value;

    // Show info and categories elements
    info.classList.remove('hidden');
    info.classList.add('block');
    categories.classList.remove('hidden');
    categories.classList.add('block');

    await generateCityData(city); // Generate city data
}

// Function to generate city data
async function generateCityData(city) {
    try {
        const cityData = await getCityData(city); // Fetch city data from the API
        barChart(cityData); // Generate bar chart
        overall(cityData); // Generate overall score
        summary(cityData); // Generate summary
        worldMap(cityData); // Generate world map

        info.scrollIntoView({ behavior: 'smooth' }); // Scroll to info element
        wave.classList.add('lg:block'); // Show wave element
        wave.classList.remove('lg:hidden');
    } catch (error) {
        console.log(error);
        const screenSize = window.innerWidth;
        if (screenSize < 600) {
            errore.textContent = "City not found. ";
        } else {
            errore.textContent = "City not found. Please enter a valid city name.";
        }
        info.classList.add('hidden'); // Hide info and categories elements
        categories.classList.add('hidden');
    }
}

// Event listener for scrolling
window.addEventListener('scroll', function() {
    if(window.scrollY > 100) {
        wave.classList.remove("lg:hidden");
        wave.classList.add("lg:block");
    }
    else {
        wave.classList.remove("lg:block");
        wave.classList.add("lg:hidden");
    }
});
